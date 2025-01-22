import React from "react";
import { SettingSwitchProps, SettingSwitchState } from "./interface";
import { Trans } from "react-i18next";
import TextToSpeech from "../../textToSpeech";
import ConfigService from "../../../utils/storage/configService";
import { readerSettingList } from "../../../constants/settingList";
import toast from "react-hot-toast";
import BookUtil from "../../../utils/file/bookUtil";
class SettingSwitch extends React.Component<
  SettingSwitchProps,
  SettingSwitchState
> {
  constructor(props: SettingSwitchProps) {
    super(props);
    this.state = {
      isBold: ConfigService.getReaderConfig("isBold") === "yes",
      isIndent: ConfigService.getReaderConfig("isIndent") === "yes",
      isSliding: ConfigService.getReaderConfig("isSliding") === "yes",
      isUnderline: ConfigService.getReaderConfig("isUnderline") === "yes",
      isShadow: ConfigService.getReaderConfig("isShadow") === "yes",
      isItalic: ConfigService.getReaderConfig("isItalic") === "yes",
      isInvert: ConfigService.getReaderConfig("isInvert") === "yes",
      isBionic: ConfigService.getReaderConfig("isBionic") === "yes",
      isPurePdf: ConfigService.getReaderConfig("isPurePdf") === "yes",
      isHideBackground:
        ConfigService.getReaderConfig("isHideBackground") === "yes",
      isHideFooter: ConfigService.getReaderConfig("isHideFooter") === "yes",
      isHideHeader: ConfigService.getReaderConfig("isHideHeader") === "yes",
      isHidePageButton:
        ConfigService.getReaderConfig("isHidePageButton") === "yes",
      isHideMenuButton:
        ConfigService.getReaderConfig("isHideMenuButton") === "yes",
    };
  }

  _handleRest = () => {
    BookUtil.reloadBooks();
  };

  _handleChange = (stateName: string) => {
    this.setState({ [stateName]: !this.state[stateName] } as any, () => {
      ConfigService.setReaderConfig(
        stateName,
        this.state[stateName] ? "yes" : "no"
      );
      toast(this.props.t("Change successful"));
      setTimeout(async () => {
        await this.props.renderBookFunc();
      }, 500);
    });
  };

  handleChange = (stateName: string) => {
    this.setState({ [stateName]: !this.state[stateName] } as any);
    ConfigService.setReaderConfig(
      stateName,
      this.state[stateName] ? "no" : "yes"
    );

    toast(this.props.t("Change successful"));
    setTimeout(() => {
      this._handleRest();
    }, 500);
  };
  render() {
    return (
      <>
        <TextToSpeech />
        {readerSettingList.map((item) => (
          <div className="single-control-switch-container" key={item.title}>
            <span className="single-control-switch-title">
              <Trans>{item.title}</Trans>
            </span>

            <span
              className="single-control-switch"
              onClick={() => {
                switch (item.propName) {
                  case "isBold":
                    this._handleChange("isBold");
                    break;
                  case "isIndent":
                    this._handleChange("isIndent");
                    break;
                  case "isSliding":
                    this._handleChange("isSliding");
                    break;
                  case "isItalic":
                    this._handleChange("isItalic");
                    break;
                  case "isUnderline":
                    this._handleChange("isUnderline");
                    break;
                  case "isShadow":
                    this._handleChange("isShadow");
                    break;
                  case "isInvert":
                    this._handleChange("isInvert");
                    break;
                  case "isBionic":
                    this._handleChange("isBionic");
                    break;
                  case "isPurePdf":
                    this._handleChange("isPurePdf");
                    break;
                  case "isHideFooter":
                    this.handleChange("isHideFooter");
                    break;
                  case "isHideHeader":
                    this.handleChange("isHideHeader");
                    break;
                  case "isHideBackground":
                    this.handleChange("isHideBackground");
                    break;
                  case "isHidePageButton":
                    this.handleChange("isHidePageButton");
                    break;
                  case "isHideMenuButton":
                    this.handleChange("isHideMenuButton");
                    break;
                  default:
                    break;
                }
              }}
              style={this.state[item.propName] ? {} : { opacity: 0.6 }}
            >
              <span
                className="single-control-button"
                style={
                  !this.state[item.propName]
                    ? {
                        transform: "translateX(0px)",
                        transition: "transform 0.5s ease",
                      }
                    : {
                        transform: "translateX(20px)",
                        transition: "transform 0.5s ease",
                      }
                }
              ></span>
            </span>
          </div>
        ))}
      </>
    );
  }
}

export default SettingSwitch;
