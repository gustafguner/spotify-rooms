import * as React from 'react';
import onClickOutside, { InjectedOnClickOutProps } from 'react-onclickoutside';

interface ClickOutsideProps {
  on: () => void;
}

class ClickOutside extends React.Component<
  ClickOutsideProps & InjectedOnClickOutProps
> {
  public handleClickOutside() {
    this.props.on();
  }

  public render() {
    return React.Children.only(this.props.children);
  }
}

export default onClickOutside(ClickOutside);
