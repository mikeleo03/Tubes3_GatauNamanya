import React from 'react';
import save from "../assets/icons/save.ico"
import fav from "../assets/icons/favorite.ico"

function Header(props) {
    return (
        <div className="h-14 flex justify-between">
            <div class="align-left py-3 pl-6 font-medium text-lg">{props.title}</div>
            <div class="align-right py-3 pr-6">
                <button class="mr-5 py-1">
                    <img src={fav} alt="fav" className="h-7"></img>
                </button>
                <button class="py-1">
                    <img src={save} alt="Save" className="h-7"></img>
                </button>
            </div>
        </div>
        
    );
}

export default Header;