import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyItems: ['bread', 'milk', 'fruit'],
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.clearList = this.clearList.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newItem = this.newItem.value; // newItem comes from the ref in the form input field. It is used instead of getElementById.
    const isOnTheList = this.state.buyItems.includes(newItem)
    if (isOnTheList) {
      this.setState({ message: 'That item is already on the list' })
    }
    else if (newItem !== '') {
      this.setState({
        buyItems: [...this.state.buyItems, newItem],
        message: ''
      });

    } else {
      return;
    }

    this.addForm.reset();
  }

  removeItem(item) {
    const newItems = this.state.buyItems.filter(
      buyItem => buyItem !== item
    );
    this.setState({
      buyItems: newItems
    })

    if (newItems.length === 0) {
      this.setState({
        message: "There are no items on your list. Add some."
      })
    }
  }

  clearList() {
    this.setState({
      buyItems: [],
      message: "There are no items on your list. Add some."
    })
  }

  render() {

    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 justify-content-center">
              <p className="headinglogo"><img className="logo" src="shopping.png" alt="logo" /></p>
              <h1>Shopping List</h1>

              <form ref={input => this.addForm = input} className="form-inline justify-content-center" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="sr-only">Add new Item</label>
                  <input ref={input => this.newItem = input} type="text" className="form-control" id="newItemInput" placeholder="enter item here" />
                </div>
                <button type="submit" className="btn btn-primary">Add Item</button>
              </form><br />
              {
                this.state.message !== '' && <p className="text-danger">{this.state.message}</p>
              }
              {
                this.state.buyItems.length !== 0 &&
                <table className="table">
                  <caption>Shopping List</caption>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Item</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <td colSpan='3' className="text-right">
                        <button className="btn btn-sm btn-default" onClick={this.clearList}>Clear List</button>
                      </td>
                    </tr>
                  </tfoot>
                  <tbody>
                    {this.state.buyItems.map(item => {
                      return (
                        <tr key={item}>
                          <th scope="col">{this.state.buyItems.indexOf(item) + 1}</th>
                          <th>{item}</th>
                          <th><button onClick={e => this.removeItem(item)} className="btn btn-default btn-small">Remove</button></th>
                        </tr>
                      )
                    })
                    }

                  </tbody>
                </table>
              }

            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
