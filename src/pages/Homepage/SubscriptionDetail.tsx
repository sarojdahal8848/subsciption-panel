import { useLocation, useNavigate } from 'react-router-dom';
import { ITableRows } from '../../components/CustomTable/CustomTable';
import { expiryStatus } from '../../utils';
import { ISubscription } from './HomePage';

const SubscriptionDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const subscriber: ITableRows = state.subscriber;
  const subscriberData: ISubscription[] = state.subscriberData;

  const handleBack = () => {
    navigate('/');
  };
  return (
    <div className="detail">
      <div className="detail__header">
        <h1>Subscriber Detail</h1>
        <button onClick={handleBack}>Back</button>
      </div>
      <div>
        <h3>Personal Info</h3>
        <div>
          <p>
            First Name: <span>{subscriber.first_name}</span>
          </p>
          <p>
            Middle Name: <span>{subscriber.middle_name}</span>
          </p>
          <p>
            Last Name: <span>{subscriber.last_name}</span>
          </p>
          <p>
            Username: <span>{subscriber.username}</span>
          </p>
          <p>
            Email: <span>{subscriber.email}</span>
          </p>
          <p>
            Address: <span>{subscriber.address}</span>
          </p>
          <p>
            Country: <span>{subscriber.country}</span>
          </p>
          <p>
            Status:{' '}
            <span>{subscriber.active === '1' ? 'Active' : 'Inactive'}</span>
          </p>
        </div>
      </div>
      <div>
        <h3>Package Info</h3>
        {!subscriberData.length && <p>No data Found</p>}
        {subscriberData.map((val: ISubscription) => (
          <div key={val.id}>
            <p>
              Package Name: <span>{val.package}</span>{' '}
              {expiryStatus(val.expires_on) && (
                <button
                  style={{
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem',
                  }}
                >
                  Expired
                </button>
              )}
            </p>
            <p>
              Expiry Date: <span>{val.expires_on}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionDetail;
