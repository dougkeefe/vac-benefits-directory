// @flow

import React, { Component } from "react";

import { Grid } from "material-ui";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { logEvent } from "../utils/analytics";
import Link from "next/link";
import SelectButton from "../components/select_button";

type Props = {
  i18n: mixed,
  t: mixed
};

class App extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      selectedOptions: []
    };
  }

  changeLanguage = () => {
    this.props.i18n.changeLanguage(this.props.t("other-language-code"));
    logEvent("Language change", this.props.t("other-language"));
  };

  throwError = () => {
    throw new Error("test");
  };

  toggleButton = id => {
    let selected = this.state.selectedOptions;
    const index = selected.indexOf(id);
    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      selected.push(id);
    }
    this.setState({
      selectedOptions: selected
    });
  };

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars
    const serviceTypes = [
      "Financial Support",
      "Rehabilitation",
      "Mental Health Services",
      "Health Care",
      "Career Transition",
      "Support for Families"
    ];

    return (
      <Layout i18n={i18n} t={t}>
        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <p style={{ textAlign: "center", fontSize: "2em" }}>
                {t("A1.What services are you interested in?")}
              </p>
              <p style={{ textAlign: "center", fontSize: "1.5em" }}>
                {t("A1.Select all that apply")}
              </p>
            </Grid>

            {serviceTypes.map((service, i) => (
              <Grid key={i} item sm={4} xs={12}>
                <SelectButton
                  t={t}
                  id={service}
                  text={"A1." + service}
                  onClick={this.toggleButton}
                  isDown={this.state.selectedOptions.indexOf(service) >= 0}
                />
              </Grid>
            ))}
          </Grid>

          <Grid
            container
            justify="center"
            spacing={24}
            style={{ marginTop: "3em" }}
          >
            <Grid item sm={4} xs={12}>
              <SelectButton
                t={t}
                text={"A1.Next"}
                href={
                  "A2?lng=" +
                  t("current-language-code") +
                  "&selected=" +
                  this.state.selectedOptions.join()
                }
                isDown={false}
              />
            </Grid>
          </Grid>

          <Grid
            container
            justify="center"
            spacing={24}
            style={{ marginTop: "1em" }}
          >
            <Grid item sm={4} xs={12}>
              <p style={{ textAlign: "center", fontSize: "1em" }}>
                <Link href="all-benefits">
                  <a>{t("Show All Benefits")}</a>
                </Link>
              </p>
            </Grid>
          </Grid>
        </div>
      </Layout>
    );
  }
}

export default withI18next(["common"])(App);