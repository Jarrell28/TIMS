import React from 'react';
import '../css/SearchBar.scss';
import ReactDOM from 'react-dom';
// import $ from "jquery";



class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { toggle: "" };
    }
    handle = () => {
        if (this.state.toggle === '') {
            this.setState({ toggle: 'open' });
        }
        else {
            this.setState({ toggle: '' });
        }
    }

    render() {
        return (
            <div>
                <div className={this.state.toggle ? this.state.toggle + " search" : "search"}>
                    <input type="search" className="search-box" />
                    <span className={this.state.toggle ? this.state.toggle + " search-button" : "search-button"} onClick={this.handle}>
                        <span className="search-icon"></span>
                    </span>
                </div>
            </div>

        )
    }
}

export default SearchBar;




// const SearchBar = () => {
//     var toggle = "open";
//     function animate() {
//        toggle = "open";
//         // $(this).parent().toggleClass('open');
//     }
//     return (
//         <div>
//             <div class="search">
//                 <input type="search" class="search-box" />
//                 <span class="search-button {toggle}" onClick={animate}>
//                     <span class="search-icon"></span>
//                 </span>
//             </div>
//         </div>

//     )
// }

// export default SearchBar;