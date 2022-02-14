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
    if (
      (event.charCode < 97 || event.charCode > 122) &&
      (event.charCode < 65 || event.charCode > 90) &&
      (event.charCode < 48 || event.charCode > 57)
    ) {
      alert("В поле разрен ввод только латинских символов и цифр");
      event.preventDefault();
    } else {
      return;
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
        <div className="divInput">
          <p>Source System: </p>
          <Select style={{ width: "89.2%" }}>
            {sourceSystem.map((item) => (
              <Option key={item.id}>
                <img src={item.img} alt={item.img} /> {item.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="divInput">
          <p>Migration Type: </p>
          <Select onChange={handleChange} style={{ width: "88.8%" }}>
            {migrationType.map((item) => (
              <Option value={item.name} key={item.id}>
                <img src={item.img} alt={item.img} /> {item.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="divInput">
          <Form
            name="basic"
            labelCol={{ span: 11 }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label={appName}
              labelAlign="left"
              name="appName"
              rules={[
                {
                  required: true,
                  message: "Please enter app name",
                },
              ]}
            >
              <Input onKeyPress={handlePress} />
            </Form.Item>
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
        </div>
      </Modal>
    </>
  );
};

export default ModalForm;
