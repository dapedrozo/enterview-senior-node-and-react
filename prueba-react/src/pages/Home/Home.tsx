import React, { useState, useRef } from 'react';
export interface HomeInterface {
}

const Home : React.FC<HomeInterface> = () => {
	const Item = ({ item, onClick }: { item: String, onClick: () => void }) => (
		<li onClick={onClick}>{item}</li>
	  );

	const [elements, setElements] = useState<String[]>([])
	const [message, setMessage] = useState("")
	const handleClick = () => {
		setElements([...elements, message])
		setMessage("")
	}
	const handleClickDelete = (el: String) => () => {
		setElements(elements.filter(i => i !== el));
	  };
	return <div>
		<input type="text" name="input-example" id="input-example" onChange={e=>setMessage(e.target.value)} value={message}/>
		<button name="button-example" id="button-example" onClick={handleClick}>Save Message</button>
		<div>
			{
				elements.map((el, index)=>(
					<Item key={index} item={el} onClick={handleClickDelete(el)} />
				))
			}
		</div>
	</div>;
};

export default Home;
