import React, { Component } from "react";
import Menu from "./Menucomponent";
import DishDetail from "./DishdetailComponent";
import Contact from "./ContactComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import About from "./AbotUsComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment, fetchDishes } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions,
  };
};

const mapDitspatchToProps = (ditspatch) => ({
  addComment: (dishId, rating, author, comment) =>
    ditspatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {
    ditspatch(fetchDishes());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("fff");
    this.props.fetchDishes();
  }

  render() {
    const HomePage = () => {
      console.log(this.props.dishes);
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route
            exact
            path="/aboutus"
            component={() => <About leaders={this.props.leaders} />}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDitspatchToProps)(Main));
