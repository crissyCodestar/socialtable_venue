import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "./hero.css";

class Hero extends Component {
	constructor(props){
		super(props);

		this.state={
			imgs:[],
			currentIndex:0
		}
		this.nextSlide.bind(this);
		this.prevSlide.bind(this);
	}

	nextSlide(e){
		e.preventDefault()

	}

	prevSlide(e){
		e.preventDefault()
		let {images} =this.props
		let currentIndex = this.state

		if(this.state.currentIndex === images.length - 1) {
      return this.setState({
        currentIndex: 0
      })
    }
		this.setState({
			currentIndex: currentIndex + 1
		})
	}

	render() {
		const { listing: { images = [], name } = {} } = this.props;
		this.setState({
			imgs: images
		})
		return( <div className="hero">
{
	images.map((image, i) => (
		<img src={image}  key={i} alt="listing" />
	))
}
			<a
			className="hero__arrow hero__arrow--left"
			onClick={this.prevSlide}
			>◀</a>
			<a className="hero__arrow hero__arrow--right"
			onClick={this.nextSlide}>▶</a>
			<div className="hero__info">
				<h1>{name}</h1>
			</div>
		</div>);
	}
}

const getHero = gql`
	query getHero {
		listing {
			name
			images
		}
	}
`;

/**
 * You shouldn't have to modify any code below this comment
 */

export default function HeroHOC(props) {
	return <Query
		query={getHero}
	>
		{({ data }) => (
			<Hero
				{...props}
				listing={data && data.listing || {}} // eslint-disable-line no-mixed-operators
			/>
		)}
	</Query>;
}
