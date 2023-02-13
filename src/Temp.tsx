import React from 'react'
import Tooltip, { EToolTipPosition } from './tooltip/Tooltip'

const Temp = () => {
  return (
    <div>

<h1 className="text-3xl font-bold underline"> Hello world! </h1>
			<Tooltip tooltipContent={{title: 'Konahamaru', body: 'Sarutobi ishji son Kona Hamaru'}} position={EToolTipPosition.TOP}>
				<h1>Hello world!</h1>
			</Tooltip>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia veniam
				exercitationem animi illo nemo, ipsum nobis itaque sed ratione eos?
				Expedita qui molestias voluptates delectus similique commodi aperiam
				praesentium perspiciatis?
			</p>
			<Tooltip tooltipContent={{body: 'asdasdasd asdas asd'}} position={EToolTipPosition.TOP} >
				<h1>Hello world2w! top</h1>
			</Tooltip>
			<br/>
			<Tooltip tooltipContent={{body: 'asdasdasd asdas asd'}} position={EToolTipPosition.BOTTOM} >
				<h1>Hello world2w! bottom</h1>
			</Tooltip>
			<br/>
			<Tooltip tooltipContent={{body: 'asdasdasd asdas asd'}} position={EToolTipPosition.RIGHT} >
				<h1>Hello world2w! right</h1>
			</Tooltip>
			<span>------------------------</span>
			<Tooltip tooltipContent={{body: 'asdasdasd asdas asd'}} position={EToolTipPosition.LEFT} >
				<h1>Hello world2w! l;eft 2</h1>
			</Tooltip>
			<span>------------------------</span>
			<Tooltip tooltipContent={{body: 'asdasdasd asdas asd'}} position={EToolTipPosition.TOP} >
				<h1>Hello world2w! l;top 2</h1>
			</Tooltip>
    </div>
  )
}

export default Temp