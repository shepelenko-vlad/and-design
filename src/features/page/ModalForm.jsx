import { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { migrationType, sourceSystem } from "../../data/page";
import "antd/dist/antd.css";
import "./ModalForm.css";

const { Option } = Select;

const ModalForm = () => {
  const [appName, setAppName] = useState("App Name: ");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const validateInput = {
    required: "В поле разрен ввод только латинских символов и цифр!",
  };

  const handleChange = (value) => {
    switch (value) {
      case "Azure Logic Apps":
        setAppName("Logic App Name: ");
        break;
      case "Apache Camel":
        setAppName("Apache Camel App Name: ");
        break;
      case "ServiceNow":
        setAppName("ServiceNow App Name: ");
        break;
      case "Ivanti":
        setAppName("Ivanti App Name: ");
        break;
      case "MuleSoft":
        setAppName("MuleSoft App Name: ");
        break;
      default:
        setAppName("App Name: ");
    }
  };

  const handlePress = (event) => {
    var charCode = event.charCodeAt(0);
    if (
      (charCode < 97 || charCode > 122) &&
      (charCode < 65 || charCode > 90) &&
      (charCode < 48 || charCode > 57)
    ) {
      return;
    } else {
      return true;
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={showModal}>Click me!</Button>

      <Modal
        title="New Migration"
        visible={isModalVisible}
        width={1000}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          validateMessages={validateInput}
          name="basic"
          labelCol={{ span: 11 }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <div className="divInput">
            <p>Source System: </p>
            <Select
              defaultValue={sourceSystem[0].name}
              style={{ width: "89.2%" }}
            >
              {sourceSystem.map((item) => (
                <Option key={item.id} value={item.name}>
                  <img src={item.img} alt={item.img} /> {item.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="divInput">
            <p>Migration Type: </p>
            <Select
              onChange={handleChange}
              defaultValue={migrationType[0].name}
              style={{ width: "88.8%" }}
            >
              {migrationType.map((item) => (
                <Option value={item.name} key={item.id}>
                  <img src={item.img} alt={item.img} /> {item.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="divInput">
            <Form.Item
              label={appName}
              labelAlign="left"
              name="appName"
              rules={[
                {
                  required: true,
                  message: "Please enter app name",
                },
                () => ({
                  validator(_, value) {
                    if (handlePress(value.slice(-1))) {
                      return Promise.resolve();
                    } else {
                      value.slice(0, value.length - 1);
                      return Promise.reject(
                        new Error(
                          "В поле разрешен ввод только латинских символов и цифр"
                        )
                      );
                    }
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              key="submit"
              type="primary"
              style={{ width: "100%" }}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalForm;
