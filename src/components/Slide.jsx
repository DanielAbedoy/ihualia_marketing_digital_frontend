import React from 'react';
import Slider from 'react-animated-slider';


//Descriocion, img, button , subtitile, aditionaltext
const Slide = ({items, history}) => {

  return (
    <Slider autoplay={3000} >
      {items.map((item, i) => {
        return (
          <div
            key={i}
            className="sliderContent"
            style={{ background: `url('${item.img}') no-repeat center center` }}
          >
            <div className="inner">
              {/* <p className="title">{item.name}</p> */}
              <p>{item.description}</p>
              {item.button ? <button onClick={item.btn_fn.navigate ? () => {history.push(item.btn_fn.navigate) } : item.btn_fn.fn } >{item.button}</button> : <></>}
            </div>
            <section>
              <span>
                {item.minititle ? item.minititle : "Powered by"} <strong>{item.aditionalTex ? item.aditionalTex : "Ihualia Software"}</strong>
              </span>
            </section>
          </div>
        );
      })}
    </Slider>
  );
}

export default Slide;