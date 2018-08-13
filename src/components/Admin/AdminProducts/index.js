import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import Left from 'material-ui/svg-icons/navigation/chevron-left';
import Right from 'material-ui/svg-icons/navigation/chevron-right';
import First from 'material-ui/svg-icons/navigation/first-page';
import Last from 'material-ui/svg-icons/navigation/last-page';
import {getProducts} from "../../../actions/RequestManager";


class AdminProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: "600px"
    }
  }

  componentWillMount() {
    this.props.getProducts();

  }

  render() {
    const styles = {
      table: {
        headerHeight: "400px"
      },
      pageNation: {
        textAlign: "center"
      }
    };

    const onSelectProduct = (productId) => {
      this.props.history.push(`/admin/product/${productId}`);
    };

    return (
      <div>
        <Table
          height={styles.table.headerHeight}
          fixedHeader={true}
          fixedFooter={false}
          selectable={false}
          multiSelectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>Image</TableHeaderColumn>
              <TableHeaderColumn>Category</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Days</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
              <TableHeaderColumn>Sale</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover={true}
            stripedRows={false}
          >
            {this.props.products.map((product, index) => (
              <TableRow key={index} onMouseDown={() => onSelectProduct(product.id)}>
                <TableHeaderColumn><img src="http://via.placeholder.com/80x80" alt=""/></TableHeaderColumn>
                <TableRowColumn>{product.category_name_en}</TableRowColumn>
                <TableRowColumn>{product.name}</TableRowColumn>
                <TableRowColumn>{product.days}</TableRowColumn>
                <TableRowColumn>{product.price_sale}</TableRowColumn>
                <TableRowColumn>{product.unusable_flag ? "X" : "O"}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={styles.pageNation}>
          <IconButton>
            <First />
          </IconButton>
          <IconButton>
            <Left />
          </IconButton>
          <IconButton>
            <Right />
          </IconButton>
          <IconButton>
            <Last />
          </IconButton>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    products: state.product.products
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProducts
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);


