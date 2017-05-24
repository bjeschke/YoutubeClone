import _ from 'lodash';
import React,{Component} from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/searchbar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = "your Youtube API Key";



class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      videos:[],
      selectedVideo: null
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term:term}, (videos) => {
      this.setState({
        videos :videos,
        selectedVideo : videos[0]
      });
      // In ES6 kann man es kurz schreiben statt this.setState({videos : videos}) kann man nur videos schreiben
    });
  }

  render(){
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
        </div>
      );
    }
}



ReactDom.render(<App />, document.querySelector('.container'));
