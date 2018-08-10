import React, { Component } from 'react';
import { Switch, Route } from "react-router";
import ShopTabs from '../../components/Tabs/ShopTabs';
import { enumAdminProducts, enumAdminCustomers, enumAdminShipping } from '../../components/Enum';
import AdminProducts from '../../components/Admin/AdminProducts';
import AdminShipping from '../../components/Admin/AdminShipping';
import AdminCustomers from '../../components/Admin/AdminCustomers';
import AdminEditProduct from '../../components/Admin/AdminEditProduct';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      divider: enumAdminProducts.value  //salad, juice Tabs를 구분하는 구분자
    }
  }

  componentDidMount() {
    this.setState({divider: this.props.location.pathname.split("/")[2]});
  }

  handleDivider(divider) {
    this.setState({divider});
    this.props.history.push(`/admin/${divider}`)
  }


  render() {
    const tabList = [enumAdminProducts, enumAdminShipping, enumAdminCustomers];

    return (
      <div>
        <ShopTabs
          tabList={tabList}
          selectedTab={this.props.location.pathname.split("/")[2]}
          handleDivider={(divider) => this.handleDivider(divider)}
          width={300}
        />
        <Switch>
          <Route
            path="/admin/products"
            component={props => (
              <AdminProducts {...props} />
            )}
          />
          <Route
            path="/admin/product/:productId"
            component={props => (
              <AdminEditProduct {...props} />
            )}
          />
          <Route
            path="/admin/shipping"
            component={props => (
              <AdminShipping {...props} />
            )}
          />
          <Route
            path="/admin/customers"
            component={props => (
              <AdminCustomers {...props} />
            )}
          />
        </Switch>
      </div>
    )
  }
}