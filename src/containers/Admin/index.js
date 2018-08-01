import React, { Component } from 'react';
import ShopTabs from '../../components/Tabs/ShopTabs';
import { enumAdminProducts, enumAdminCustomers, enumAdminShipping } from '../../components/Enum';
import AdminProducts from '../../components/Admin/AdminProducts';
import AdminShipping from '../../components/Admin/AdminShipping';
import AdminCustomers from '../../components/Admin/AdminCustomers';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      divider: enumAdminProducts.value  //salad, juice Tabs를 구분하는 구분자
    }
  }

  handleDivider(divider) {
    this.setState({divider});
  }

  renderAdmin() {
    switch (this.state.divider) {
      case enumAdminProducts.value:
        return <AdminProducts />;
      case enumAdminShipping.value:
        return <AdminShipping />;
      case enumAdminCustomers.value:
        return <AdminCustomers />;
      default:
        return <AdminProducts />;
    }
  }

  render() {
    const tabList = [enumAdminProducts, enumAdminShipping, enumAdminCustomers];

    return (
      <div>
        <ShopTabs
          tabList={tabList}
          handleDivider={(divider) => this.handleDivider(divider)}
          width={300}
        />
        { this.renderAdmin() }
      </div>
    )
  }
}