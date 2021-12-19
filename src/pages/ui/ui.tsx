import { Section } from "#components/molecules/Section";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Container } from "react-grid-system";
import { Button, Drawer, Input, notification, Space } from "antd";
import Modal from "antd/lib/modal/Modal";

const UI: NextPage = () => {

	const [isModalVisible, setIsModalVisible] = useState(false);

	const [visible, setVisible] = useState(false);
	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const openNotification = () => {
		notification.open({
			message: 'Notification Title',
			description:
				'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
			onClick: () => {
			},
		});
	};

	return (
		<>
			<Head>
				<title>Админка | UI/UX</title>
			</Head>
			<Container>
				<Section>
					<Space>
						<Button type="primary" onClick={showModal}>
							Open Modal
						</Button>
						<Button type="primary" onClick={openNotification}>
							Open the notification box
						</Button>
						<Button type="primary" onClick={showDrawer}>
							Open
						</Button>
					</Space>
					<Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Modal>
					<Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Drawer>
				</Section>
			</Container>
		</>
	);
};

export default UI;