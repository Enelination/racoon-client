import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import PostComment from './PostComment'
import {API_ROOT, headers} from '../services/api'
import addBookmark from '../actions/addBookmark'

class MarkerCard extends Component {
	constructor() {
		super()
		this.state = {
			markerData: {}
		}
	}

	componentDidMount() {
		let id = this.props.match.params.id
		fetch(`${API_ROOT}/map_markers/${id}`)
			.then(response => response.json())
			.then(json => {this.setState({markerData: json})})
	}

	handleCommentPost = (event, comment) => {
		const newComment = {
			content: comment.content,
			user: this.props.currentUser
		}
		this.setState(prevState => {
			prevState.markerData.comments.push(newComment); 
			return prevState
		})
	}

	addToBookmarks = (event) => {
		let markerData = {
			user_id: this.props.currentUser.id,
			map_marker_id: this.state.markerData.id
		}

		this.props.addBookmark(event, markerData, this.props.history)
	}

	render() {
		return(
			<div className="marker-page">
				<h1 className="marker-page-title">{this.state.markerData.title}</h1>
				<p>{this.state.markerData.address}</p>
				<h2>Comments:</h2>
				<ul>{this.state.markerData.comments ? 
				(this.state.markerData.comments.map(comment => <Comment comment={comment} key={comment.id}/>))
				:
				null
			}</ul>
			<PostComment handleCommentPost={this.handleCommentPost} markerId={this.state.markerData.id}/>
			<button onClick={this.addToBookmarks}className="add-bookmark-button">Add To Bookmarks</button>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
	return {
		addBookmark: (event, markerData, history) => {dispatch(addBookmark(event, markerData, history))}
	}
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerCard)
