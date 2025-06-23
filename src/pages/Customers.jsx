
import AddCustomer from './customer/AddCustomer';
import CustomerList from './customer/CustomerList';

const CustomersPage = () => {

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mt-4">
       <AddCustomer />
       <CustomerList />
      </div>
    </div>
  );
};

export default CustomersPage;