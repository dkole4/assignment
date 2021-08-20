import React from "react";
import { Header, Icon } from "semantic-ui-react";

export const Loading = () => (
  <Header as='h2' icon>
    <Icon loading name='circle notch' />
    Loading...
    <Header.Subheader>
      Setting up your personal rulebook...
    </Header.Subheader>
  </Header>
)