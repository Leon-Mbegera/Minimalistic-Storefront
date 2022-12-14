import React from "react";
import { NavLink } from "react-router-dom";
import { blackCart, blackWheel } from "../../assets/blackShoppingCart";
import { up, down } from "../../assets/updownArrows";
import {
  logoSvg,
  belowLogo,
  logoMark,
  logoMarkArrow,
} from "../../assets/logoIcon";
import { connect } from "react-redux";
import { currencyChange } from "../../redux";
import CartOverlay from "../containers/CartOverlay";
import { sneakQuantity } from "../../Utils/utilities";
import { freezeContent, unfreezeContent } from "../../redux";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOverlayOpen: false, isDropdownOpen: false };
    this.currencyRef = React.createRef();
    this.overlayRef = React.createRef();
    this.checkIfClickedOutside = this.checkIfClickedOutside.bind(this);
  }

  checkIfClickedOutside = (e) => {
    if (
      this.state.isOverlayOpen &&
      this.overlayRef.current &&
      !this.overlayRef.current?.contains(e.target)
    ) {
      this.setState((prevState) => {
        return {
          ...prevState,
          isOverlayOpen: !prevState.isOverlayOpen,
        };
      });
      this.props.dispatch(unfreezeContent());
    }

    if (
      this.state.isDropdownOpen &&
      this.currencyRef.current &&
      !this.currencyRef.current?.contains(e.target)
    ) {
      this.setState((prevState) => {
        return {
          ...prevState,
          isDropdownOpen: !prevState.isDropdownOpen,
        };
      });
    }
  };

  componentDidMount() {
    document.addEventListener("click", this.checkIfClickedOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.checkIfClickedOutside);
  }

  showCartOverlay = (e) => {
    if (
      this.state.isOverlayOpen &&
      this.overlayRef.current &&
      this.overlayRef.current.contains(e.target)
    ) {
      this.props.dispatch(unfreezeContent());
      this.setState((prevState) => {
        return {
          ...prevState,
          isOverlayOpen: !prevState.isOverlayOpen,
        };
      });
    } else {
      this.setState((prevState) => ({
        ...prevState,
        isOverlayOpen: !prevState.isOverlayOpen,
      }));
      this.props.dispatch(freezeContent());
    }
  };

  showDropdownList = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isDropdownOpen: !prevState.isDropdownOpen,
      };
    });
  };

  handleCurrencyChange = (option) => {
    this.props.dispatch(currencyChange(option));
  };

  render() {
    return (
      <>
        <nav className="navbar">
          <div className="navbar-div">
            <div className="navbar-links">
              {this.props.navlinks.map((link) => (
                <div key={link.name}>
                  <NavLink
                    to={`/${link.name}`}
                    className={({ isActive }) =>
                      isActive ? "active-navlink" : "navbar-link"
                    }
                  >
                    {link.name}
                  </NavLink>
                </div>
              ))}
            </div>
            <div className="logo">
              <span className="main-logo">
                {logoSvg}
                <span className="logo-mark">{logoMark}</span>
                <span className="logo-mark-arrow">{logoMarkArrow}</span>
                <span className="background-svg">{belowLogo}</span>
              </span>
            </div>
            <div className="dropdown">
              <div className="buttons">
                <button
                  ref={this.currencyRef}
                  type="button"
                  className="dropdownBtn"
                  onClick={() => this.showDropdownList()}
                >
                  {this.props.currency.symbol}
                  <div className="arrows">
                    <span
                      className={
                        this.state.isDropdownOpen ? "visible-arrow" : "caret"
                      }
                    >
                      {up}
                    </span>
                    <span
                      className={
                        this.state.isDropdownOpen
                          ? "caron hidden-arrow"
                          : "caron"
                      }
                    >
                      {down}
                    </span>
                  </div>
                </button>
                {this.state.isDropdownOpen ? (
                  <ul className="dropdown-menu">
                    {this.props.currencies.map((opt) => {
                      return (
                        <li
                          key={opt.label}
                          onClick={() => this.handleCurrencyChange(opt)}
                        >
                          {opt.symbol} {opt.label}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
              <div className="cartOverlay-div" ref={this.overlayRef}>
                <div
                  className="cartOverlay-cart"
                  onClick={(e) => this.showCartOverlay(e)}
                >
                  <span className="black-cart">{blackCart}</span>
                  <span className="left-black-wheel">{blackWheel}</span>
                  <span className="right-black-wheel">{blackWheel}</span>
                  <div
                    className={
                      sneakQuantity(this.props.cartData.cart)
                        ? "sneak-count"
                        : "hide-count"
                    }
                  >
                    {sneakQuantity(this.props.cartData.cart)}
                  </div>
                </div>
                {this.state.isOverlayOpen && this.props.freezeState.freeze ? (
                  <div className="cartOverlay-wrapper">
                    <CartOverlay />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.selectedCurrency,
  cartData: state.cartData,
  freezeState: state.freezeState,
});

export default connect(mapStateToProps)(Navbar);
