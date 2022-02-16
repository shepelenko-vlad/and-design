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

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Success: ", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
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
            sourceSystem: sourceSystem[0].name,
            migrationType: migrationType[0].name,
          }}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="sourceSystem" label="Source System">
            <Select>
              {sourceSystem.map((item) => (
                <Option key={item.id} value={item.name}>
                  <img src={item.img} alt={item.img} /> {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="migrationType" label="Migration Type">
            <Select onChange={handleChange}>
              {migrationType.map((item) => (
                <Option value={item.name} key={item.id}>
                  <img src={item.img} alt={item.img} /> {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
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
                    const regexp = /[^\w]/gi;

                    return regexp.test(value)
                      ? Promise.reject(
                          new Error(
                            "В поле разрешен ввод только латинских символов и цифр"
                          )
                        )
                      : Promise.resolve();
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
