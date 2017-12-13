import React from 'react';
import './App.css';

class Table extends React.Component {
  state = { sortColumn: '', sortOrder: 'descending' };
  onHeaderClick = value => {
    console.log(value);
  };

  wrapChild = child => {
    if (child.type.name === 'Head') {
      return React.cloneElement(child, { onHeaderClick: this.onHeaderClick });
    }
    return child;
  };

  render() {
    const children = React.Children.map(this.props.children, this.wrapChild);
    return <table className="table">{children}</table>;
  }
}

class Head extends React.Component {
  wrapChild = child => {
    return (
      <td>
        <button onClick={this.props.onHeaderClick}>{child}</button>
      </td>
    );
  };

  render() {
    const headCells = React.Children.map(this.props.children, this.wrapChild);
    return (
      <thead>
        <tr>{headCells}</tr>
      </thead>
    );
  }
}

class Body extends React.Component {
  render() {
    return <tbody>{this.props.children}</tbody>;
  }
}

class Row extends React.Component {
  wrapChild(child) {
    return <td>{child}</td>;
  }

  render() {
    const rows = React.Children.map(this.props.children, this.wrapChild);
    return <tr>{this.props.children}</tr>;
  }
}

class Cell extends React.Component {
  render() {
    if (!this.props.render) {
      return <div>{this.props.value}</div>;
    }
    return this.props.render({ value: this.props.value });
  }
}

class App extends React.Component {
  render() {
    return (
      <Table>
        <Head>
          <div className="red-bg">A</div>
          <div className="blue-bg">B</div>
        </Head>
        <Body>
          <Row>
            <Cell
              column="hello"
              value="world"
              render={({ value }) => <div className="blue-bg">{value}</div>}
            />
            <Cell column="foo" value="bar" />
          </Row>
        </Body>
      </Table>
    );
  }
}

export default App;
