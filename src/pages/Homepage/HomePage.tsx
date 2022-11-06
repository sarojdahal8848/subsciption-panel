import { useEffect, useState } from 'react';
import CustomTable, {
  ITableRows,
} from '../../components/CustomTable/CustomTable';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchItems();
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

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch('./users.json');
    const users = await res.json();
    if (users) {
      setData(users);
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

  const handleSearch = debounce(searchApiFun, 300);

  if (loading) {
    return <h1 style={{ textAlign: 'center' }}>Loading....</h1>;
  }

  return (
    <div>
      <CustomTable
        columns={columns}
        data={data}
        title="subscriber"
        handleSearch={handleSearch}
      />
    </div>
  );
};

export { HomePage };
