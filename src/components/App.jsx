import { Component } from 'react';
import s from './App.module.css';

import { SearchBar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ImagesAPI } from '../services/serviceApi';
export class App extends Component {
  state = {
    searchQuery: '',
    imageGallery: [],
    loading: false,
    page: 1,
    totalHits: null,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page, totalHits } = this.state;
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      ImagesAPI(searchQuery, page)
        .then(imageGallery => {
          if (totalHits === 0) {
            this.setState({ error: `images ${searchQuery} not found ` });
          }
          this.setState(prevState => ({
            loading: false,
            imageGallery: [...prevState.imageGallery, ...imageGallery.hits],
            totalHits: imageGallery.totalHits,
          }));
        })
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  openModal = () => {};

  onSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.searchBar.value;
    this.setState({
      imageGallery: [],
      searchQuery: value,
      page: 1,
      totalHits: null,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { loading, imageGallery, totalHits, page } = this.state;
    const totalPages = totalHits / 12;
    return (
      <div className={s.App}>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery imageGallery={imageGallery} />
        {loading && <Loader />}

        {totalPages > page && <Button onClick={this.onLoadMore} />}
      </div>
    );
  }
}
