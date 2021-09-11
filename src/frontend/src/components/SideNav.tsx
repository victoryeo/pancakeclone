import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Link, withRouter, RouteComponentProps } from "react-router-dom";

interface Container_DIV {
  active: boolean
}

const StyledNavItem = styled.div<Container_DIV>`
  height: 70px;
  width: 75px; /* width must be same size as NavBar to center */
  text-align: center; /* Aligns <a> inside of NavIcon div */
  margin-bottom: 0;   /* Puts space between NavItems */
  a {
    font-size: 2.7em;
    color: ${(props) => props.active ? "white" : "#9FFFCB"};
    :hover {
        opacity: 0.7;
        text-decoration: none; /* Gets rid of underlining of icons */
    }  
  }
`;

interface NIProps {
  path: string
  onItemClick: (path: string) => void
  active: boolean
  css: string
  name: string
}

class NavItem extends React.Component<NIProps> {
  handleClick = () => {
    const { path, onItemClick } = this.props;
    onItemClick(path);
  }

  render() {
    const { active } = this.props;
    return(
      <StyledNavItem active={active}>
        <Link to={this.props.path} className={this.props.css} onClick={this.handleClick}>
          <NavIcon></NavIcon>
        </Link>
      </StyledNavItem>
    );
  }
}

const NavIcon = styled.div`

`;

const StyledSideNav = styled.div`   
  position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
  height: 100%;
  width: 75px;     /* Set the width of the sidebar */
  z-index: 1;      /* Stay on top of everything */
  top: 3.4em;      /* Stay at the top */
  background-color: #222; /* Black */
  overflow-x: hidden;     /* Disable horizontal scroll */
  padding-top: 10px;
`;

interface SNProps {
}

export interface StateItems { 
  path: string
  name: string
  css: string
  key: number
}

interface SNState {
  activePath?: string
  items: StateItems[]
}

class SideNav extends React.Component<SNProps & RouteComponentProps, SNState> {
  constructor(props: any) {
    super(props);
    this.state = {
      activePath: props.location.pathname,
      items: [
        {
          path: '/', /* path is used as id to check which NavItem is active basically */
          name: 'Home',
          css: 'fa fa-fw fa-home',
          key: 1 /* Key is required, else console throws error. */
        },
        {
          path: '/trade',
          name: 'Trade',
          css: 'fas fa-sync-alt',
          key: 2
        },
        {
          path: '/pool',
          name: 'Pool',
          css: 'fas fa-beer',
          key: 3
        },
      ]
    }
  }

onItemClick = (path: string) => {
  this.setState({ activePath: path });
}

render() {
  const { items, activePath } = this.state;
  return(
    <StyledSideNav>
      {
        items.map((item) => {
          return (
            <NavItem 
              path={item.path}
              name={item.name}
              css={item.css}
              onItemClick={this.onItemClick}
              active={item.path === activePath}
              key={item.key}
            />
          );
        })
      }
    </StyledSideNav>
    );
  }
}

const RouterSideNav = withRouter(SideNav);
export default RouterSideNav;