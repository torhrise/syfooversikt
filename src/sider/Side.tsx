import { Column, Container, Row } from 'nav-frontend-grid';
import React from 'react';
import DocumentTitle from 'react-document-title';
import ContextContainer from '../context/ContextContainer';

interface SideProps {
  children: object;
}

const Side = ({ children }: SideProps) => {
  return (
    <DocumentTitle title="Syfooversikt">
      <Container>
        <Row>
          <Column className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
            <ContextContainer />
          </Column>
        </Row>
        <Row>
          <Column className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
            {children}
          </Column>
        </Row>
      </Container>
    </DocumentTitle>
  );
};

export default Side;
