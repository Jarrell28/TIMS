import React from 'react';
import '../css/SearchBar.scss';
import ReactDOM from 'react-dom';
// import $ from "jquery";



class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { toggle: "" }
    }
    animate() {
        this.setState({ toggle: "open" })
        // $(this).parent().toggleClass('open');
    }

    render() {
        return (
            <div>
                <div class="search-small">>
                <div class="search">
                        <input type="search" class="search-box" />
                        <span class="search-button {this.state.toggle}" onClick={this.animate}>
                            <span class="search-icon"></span>
                        </span>
                    </div>
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