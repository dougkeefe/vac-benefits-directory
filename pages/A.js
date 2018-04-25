// @flow

import React, { Component } from "react";

import withRedux from "next-redux-wrapper";
import { initStore, loadDataStore } from "../store";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { bindActionCreators } from "redux";
import { fetchFromAirtable } from "../utils/airtable";

import A1 from "../components/A1";
import A2 from "../components/A2";
import A3 from "../components/A3";

type Props = {
  i18n: mixed,
  t: mixed,
  storeHydrated: boolean,
  loadDataStore: mixed,
  benefitTypes: mixed,
  patronTypes: mixed,
  benefits: mixed,
  corporaEn: mixed,
  corporaFr: mixed
};

export class App extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      section: "A1",
      selectedBenefitTypes: [],
      selectedPatronTypes: []
    };
  }

  async componentWillMount() {
    if (!this.props.storeHydrated) {
      fetchFromAirtable(this.props.loadDataStore);
    }
  }

  switchSection = (newSection, data) => {
    this.setState({
      section: newSection,
      selectedBenefitTypes:
        data.selectedBenefitTypes || this.state.selectedBenefitTypes,
      selectedPatronTypes:
        data.selectedPatronTypes || this.state.selectedPatronTypes
    });
  };

  sectionToDisplay = section => {
    switch (section) {
      case "A1":
        return (
          <A1
            t={this.props.t}
            storeHydrated={this.props.storeHydrated}
            benefitTypes={this.props.benefitTypes}
            selectedBenefitTypes={this.state.selectedBenefitTypes}
            switchSection={this.switchSection}
          />
        );
      case "A2":
        return (
          <A2
            t={this.props.t}
            storeHydrated={this.props.storeHydrated}
            patronTypes={this.props.patronTypes}
            switchSection={this.switchSection}
            selectedPatronTypes={this.state.selectedPatronTypes}
          />
        );
      case "A3":
        return (
          <A3
            t={this.props.t}
            storeHydrated={this.props.storeHydrated}
            benefitTypes={this.props.benefitTypes}
            patronTypes={this.props.patronTypes}
            benefits={this.props.benefits}
            corporaEn={this.props.corporaEn}
            corporaFr={this.props.corporaFr}
            switchSection={this.switchSection}
            selectedPatronTypes={this.state.selectedPatronTypes}
            selectedBenefitTypes={this.state.selectedBenefitTypes}
          />
        );
    }
  };

  render() {
    return (
      <Layout i18n={this.props.i18n} t={this.props.t}>
        {this.sectionToDisplay(this.state.section)}
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDataStore: bindActionCreators(loadDataStore, dispatch)
  };
};

const mapStateToProps = state => {
  return {
    benefits: state.benefits,
    benefitTypes: state.benefitTypes,
    patronTypes: state.patronTypes,
    corporaEn: state.corporaEn,
    corporaFr: state.corporaFr
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  withI18next()(App)
);