import React, { useRef, useState } from 'react';
import './Tooltip.css';

const HORIZONTAL_OFFSET = 10;
const VERTICAL_OFFSET = 5;
const arrowClassMap = {
	top: 'arrow-at-box-bottom',
	bottom: 'arrow-at-box-top',
	left: 'arrow-at-box-right',
	right: 'arrow-at-box-left',
};

export enum EToolTipPosition {
	TOP = 'top',
	BOTTOM = 'bottom',
	LEFT = 'left',
	RIGHT = 'right',
}

export interface ITooltipContent {
	title?: string;
	body: string;
}

export interface ITooltip {
	tooltipContent: ITooltipContent;
	children: JSX.Element | JSX.Element;
	position?: EToolTipPosition;
	delay?: number;
}

const Tooltip = (props: ITooltip) => {
	const {
		children,
		tooltipContent,
		delay,
		position: toolTipPosition = EToolTipPosition.BOTTOM,
	} = props;
	const { title, body } = tooltipContent;
	const [tooltipVisibility, setTooltipVisibility] = useState(false);
	const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
	const toolTipWrapRef = useRef<HTMLDivElement>(null);
	const toolTipRef = useRef<HTMLDivElement>(null);

	const showToolTip = () => {
		const tooltipWrapDimensions =
			toolTipWrapRef.current?.getBoundingClientRect() as DOMRect;
		const { left, width, top, height } = tooltipWrapDimensions;
		let toolTipStyleObj: React.CSSProperties = {};
		switch (toolTipPosition) {
			case EToolTipPosition.TOP:
				toolTipStyleObj = {
					bottom: height + VERTICAL_OFFSET,
					left: width / 2,
					transform: 'translateX(-50%)',
				};
				break;

			case EToolTipPosition.LEFT:
				toolTipStyleObj = {
					top: height / 2,
					right: width + HORIZONTAL_OFFSET,
					transform: 'translateY(-50%)',
				};
				break;

			case EToolTipPosition.RIGHT:
				toolTipStyleObj = {
					top: height / 2,
					left: width + HORIZONTAL_OFFSET,
					transform: 'translateY(-50%)',
				};
				break;

			default:
				toolTipStyleObj = {
					top: height + VERTICAL_OFFSET,
					left: width / 2,
					transform: 'translateX(-50%)',
				};
		}

		setTooltipStyle(toolTipStyleObj);
		// todo: add delay
		setTooltipVisibility(true);
	};

	const hideTooltip = () => {
		setTooltipVisibility(false);
	};

    const tooltipArrowClass = arrowClassMap[toolTipPosition];
	return (
		<div
			ref={toolTipWrapRef}
			className="tooltip-wrapper"
			onMouseEnter={showToolTip}
			onMouseLeave={hideTooltip}
		>
			{children}
			{tooltipVisibility && (
				<div
					ref={toolTipRef}
					style={tooltipStyle}
					className={`tooltip-container tooltip-arrow ${tooltipArrowClass}`}
				>
					{title && <h3 className="tooltip-title"> {title} </h3>}
					{<p> {body} </p>}
				</div>
			)}
		</div>
	);
};

export default Tooltip;
