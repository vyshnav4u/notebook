import React from 'react';

interface IZoomMeta {
	imageZoomLevel: number;
}
// todo: make number animated count
const ZoomMeta: React.FC<IZoomMeta> = (props) => {
	const { imageZoomLevel } = props;

	const zoomPercentage = imageZoomLevel * 100;
	return (
		<div className="pv-fullscreen-zoom-info">
			{`${zoomPercentage.toFixed(0)}%`}
		</div>
	);
};

export default ZoomMeta;
