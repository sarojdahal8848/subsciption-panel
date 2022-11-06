import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomCard from '../../components/CustomCard/CustomCard';
import CustomTable, {
  ITableRows,
} from '../../components/CustomTable/CustomTable';
import { expiryStatus } from '../../utils';
import './styles.scss';

export interface ISubscription {
  id: number;
  user_id: string;
  package: string;
  expires_on: string;
}

const columns = [
  {
    access_name: 'id',
    label: 'Id',
    sortable: true,
  },
  {
    access_name: 'first_name',
    label: 'Name',
    sortable: true,
  },
  {
    access_name: 'email',
    label: 'Email',
    sortable: false,
  },
  {
    access_name: 'username',
    label: 'Username',
    sortable: false,
  },
  {
    access_name: 'address',
    label: 'Address',
    sortable: true,
  },
  {
    access_name: 'country',
    label: 'Country',
    sortable: true,
  },
  {
    access_name: 'active',
    label: 'Status',
    sortable: true,
  },
];
type Timer = ReturnType<typeof setTimeout>;
type SomeFunction = (...args: any[]) => void;
const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [subsciptionData, setSubscriptionData] = useState([]);
  const [totalSubscriber, setTotalSubscriber] = useState<number>(0);
  const [activeSubscriber, setActiveSubscriber] = useState<number>(0);
  const [totalPackages, setTotalPackages] = useState<number>(0);
  const [totalCountries, setTotalCountries] = useState<number>(0);
  const [totalexpiredSubscription, setTotalExpiredSubscription] =
    useState<number>(0);
  useEffect(() => {
    fetchData();
  }, []);

  const debounce = (func: SomeFunction, timeout: number) => {
    let timer: Timer;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch('./users.json');
    const users = await res.json();
    const resSubscription = await fetch('./subscriptions.json');
    const subscriptions = await resSubscription.json();
    if (users && subscriptions) {
      const activelist = users.filter(
        (val: ITableRows) => val.active === '1'
      ).length;
      const packages = [
        ...new Set(subscriptions.map((item: ISubscription) => item.package)),
      ].length;
      const country = [...new Set(data.map((item: ITableRows) => item.country))]
        .length;
      const expiredSubscriptions = subscriptions.filter(
        (val: ISubscription) => {
          return expiryStatus(val.expires_on);
        }
      );
      setData(users);
      setSubscriptionData(subscriptions);
      setTotalSubscriber(users.length);
      setActiveSubscriber(activelist);
      setTotalPackages(packages);
      setTotalCountries(country);
      setTotalExpiredSubscription(expiredSubscriptions.length);
      setLoading(false);
    } else {
      setData([]);
    }
  };

  const searchApiFun = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const res = data.filter(
      (val: ITableRows) =>
        val.first_name.includes(value) ||
        val.last_name.includes(value) ||
        val.email.includes(value) ||
        val.username.includes(value) ||
        val.address.includes(value) ||
        val.country.includes(value)
    );
    if (res) {
      setData(res);
    }
  };

  const handleClick = (id: number) => {
    const subscriberData = subsciptionData.filter(
      (val: ISubscription) => Number(val.user_id) === id
    );
    const subscriber = data.filter((val: ITableRows) => val.id === id)[0];
    navigate(`/subscriber/${id}`, { state: { subscriber, subscriberData } });
  };
  const handleSearch = debounce(searchApiFun, 300);

  if (loading) {
    return <h1 style={{ textAlign: 'center' }}>Loading....</h1>;
  }

  return (
    <div className="homepage">
      <div className="homepage__displaycard">
        <CustomCard title="Total Users" value={totalSubscriber} />
        <CustomCard
          title="Active Subscriber"
          value={activeSubscriber}
          bgColor="blue"
          textColor="white"
        />
        <CustomCard
          title="Total Packages"
          value={totalPackages}
          bgColor="green"
          textColor="white"
        />
        <CustomCard
          title="Total Countries"
          value={totalCountries}
          bgColor="Orange"
          textColor="white"
        />
        <CustomCard
          title="Total Expired Subscription"
          value={totalexpiredSubscription}
          bgColor="blue"
          textColor="white"
        />
      </div>
      <CustomTable
        columns={columns}
        data={data}
        title="subscriber"
        handleSearch={handleSearch}
        handleClick={handleClick}
      />
    </div>
  );
};

export { HomePage };
export default HomePage;
