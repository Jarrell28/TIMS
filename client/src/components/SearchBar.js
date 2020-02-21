import React from 'react';
import '../css/SearchBar.scss';

const SearchBar = () => {
    return (
        <div>
            <div class="search">
                <input type="search" class="search-box" />
                <span class="search-button">
                    <span class="search-icon"></span>
                </span>
            </div>
        </div>

    )
}

export default SearchBar;