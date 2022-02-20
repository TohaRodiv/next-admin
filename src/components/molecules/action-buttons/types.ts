import { ButtonProps } from "antd/lib/button"

export type TButtonActionProps = {
	text?: string
} & ButtonProps

export type TButtonGoToProps = {
	path: string
}