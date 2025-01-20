import React, { useState } from 'react';
import Input from '../../commonComponents/Input/Input';
import "./NewBoardForm.styled.css"
import Button from '../../commonComponents/addButton/addButton';
// import { FaPlus } from 'react-icons/fa';
import Sprite from '../../../images/projectIconsSprite.svg';
import { Pointer } from 'lucide-react';
import image05 from '../../../images/bgImage-dark.jpg';


const backgroundImages = [
  {
    src: image05,  
    alt: 'Background image 05',
  },
    
    {  
    min: 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/vlk8bztf90uy6itveqjl.png',
    desktop:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213352/backgrounds/tesktop/vkqsbjyvj9w1qambogr4.jpg',

    tablet:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213392/backgrounds/tablet/kjqrapchwwpqqvmlojzo.jpg',

    mobile:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213426/backgrounds/mobile/d9vbh52lskqtan3nswhp.jpg',
  },
  {
    min: 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/v0wt4bwax3bhdlag1ziv.png',
    desktop:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213352/backgrounds/tesktop/qqborbaqsnthrqdqziet.jpg',
    tablet:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213392/backgrounds/tablet/lunf3da7nbskduemxfnw.jpg',
    mobile:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213426/backgrounds/mobile/aa8uomnumsz6qpqlacst.jpg',
  },
  {
    min: 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220071/backgrounds/mini/c08fbwcqicwfqwksxsyx.png',
    desktop:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213352/backgrounds/tesktop/as7gjo4ldgtjt3mjgt6a.jpg',

    tablet:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213392/backgrounds/tablet/m944umz7gnefnninftyc.jpg',

    mobile:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213427/backgrounds/mobile/u68hupjbuojujhmcyl0g.jpg',
  },
  {
    min: 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220071/backgrounds/mini/sey0nharzdv7uzxpt98w.png',
    desktop:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213352/backgrounds/tesktop/qktiszckfwvzqlgimixd.jpg',

    tablet:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213392/backgrounds/tablet/lbn14qagjmvtc6rzkg7s.jpg',

    mobile:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213426/backgrounds/mobile/shdbu5ej0txqop4r8lpx.jpg',
  },
  {
    min: 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220069/backgrounds/mini/lfrtnx9rqh3koliovr7h.png',
    desktop:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213353/backgrounds/tesktop/lwidx5syzorlwjwqwjqm.jpg',
    tablet:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213392/backgrounds/tablet/defloijqmtoifwptlwdb.jpg',

    mobile:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213426/backgrounds/mobile/imobfaja16rwedcyre7i.jpg',
  },
  {
    min: 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/oyfwjk41qpxsud8g8ri9.png',
    desktop:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213353/backgrounds/tesktop/diliajbgk2xyz5rjrqoc.jpg',

    tablet:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213392/backgrounds/tablet/abzvuzz8bpe7wecui82f.jpg',

    mobile:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213426/backgrounds/mobile/pdgn9rftoccsopzvj1xr.jpg',
  },
  {
    min: 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/yjuxoyg5cjxzpk30oeoe.png',
    desktop:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213353/backgrounds/tesktop/ynh1gf579zbuby0m2bsf.jpg',

    tablet:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213393/backgrounds/tablet/r8a5xtbrvoqnl80ae9nw.jpg',

    mobile:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213426/backgrounds/mobile/phxvctlbtkg7fdldcrnx.jpg',
  },
  {
    min: 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/yjyionahp9lthpybw5sg.png',
    desktop:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213353/backgrounds/tesktop/deucg5znf31eszaelrmr.jpg',

    tablet:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213393/backgrounds/tablet/dpcqg9qciixeaiubdjkh.jpg',

    mobile:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213427/backgrounds/mobile/adlgu0g55qt7hj18a5md.jpg',
  },
  {
    min: 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220071/backgrounds/mini/sce6oy35czbj7yb9osoe.png',
    desktop:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213353/backgrounds/tesktop/mfwbtywdz53zrte0oxca.jpg',

    tablet:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213393/backgrounds/tablet/tg1tanymdnltqbx5zq0i.jpg',

    mobile:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213427/backgrounds/mobile/xuyndtedne0buyxvim7b.jpg',
  },
  {
    min: 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/whne8ssdvejvamukn7sc.png',
    desktop:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213353/backgrounds/tesktop/tst6fdpcdkphi2p8mqti.jpg',

    tablet:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213393/backgrounds/tablet/ikbb8zgeaxdgzv5d98wr.jpg',

    mobile:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213427/backgrounds/mobile/vbza5v5wwlzkp41mpiyd.jpg',
  },
  {
    min: 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/womdt7hq0ngnofzbuhgu.png',
    desktop:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213353/backgrounds/tesktop/jxc8czebuik3fl3v3yxj.jpg',
    tablet:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213393/backgrounds/tablet/re5vcauesolysixufz4b.jpg',

    mobile:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213427/backgrounds/mobile/pzectqbbryn1yjcj4bh9.jpg',
  },
  {
    min: 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/tqbovopj2qyuln6ing9o.png',
    desktop:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213353/backgrounds/tesktop/clra43vl2i8mzja8vy4x.jpg',

    tablet:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213393/backgrounds/tablet/mislgwkpkpmi4ua5owfd.jpg',

    mobile:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213427/backgrounds/mobile/lazkzq1p8y3oprsffwqi.jpg',
  },
  {
    min: 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/csxhywowypy9arxzig17.png',
    desktop:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213354/backgrounds/tesktop/boxlt0yih0pofybu62ye.jpg',

    tablet:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213393/backgrounds/tablet/ztqcupo7mny7j9xpkfzh.jpg',

    mobile:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213427/backgrounds/mobile/njoymrwbirazgc8wexjk.jpg',
  },
  {
    min: 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/vaxhftlahpyrpje3itvb.png',
    desktop:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213354/backgrounds/tesktop/et4io3gnh2ffzyc9omxb.jpg',

    tablet:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213393/backgrounds/tablet/k7yi2w5gfcxlbucmdqee.jpg',

    mobile:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213427/backgrounds/mobile/rsv8sop59qcjq5opz5do.jpg',
  },
  {
    min: 'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693220070/backgrounds/mini/pgjqswykxm1qukwfyic0.png',
    desktop:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213354/backgrounds/tesktop/nslbjdpoeh79acamt6yy.jpg',

    tablet:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213393/backgrounds/tablet/r7aegnamflnqpka9gdlj.jpg',

    mobile:
      'https://res.cloudinary.com/dbxyhtguo/image/upload/v1693213427/backgrounds/mobile/slsphaylhwdtgvy1gnp6.jpg',
  },
];


const Card = ({ className, style }) => (
  <div className={`${className}`} style={style}></div>
);


export default function NewBoardForm({ onClose}) {
  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        {/* Butonul de închidere */}
        <button
          className="close-btn "
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path d="M13.5 4.5L4.5 13.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4.5 4.5L13.5 13.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        </button>

      

        <div className="div-container" >
        <div className="text">New board</div>
  <Input
    className="custom-input"
    value={title}
    handleChange={handleTitleChange}
    placeholder="Title"
  />
            <h3 >
              Icons
            </h3>
            <div className="icon-container">
      <svg className="icon">
        <use href={`${Sprite}#0`} />
      </svg>
      <svg className="icon">
        <use href={`${Sprite}#1`} />
      </svg>
      <svg className="icon">
        <use href={`${Sprite}#2`} />
      </svg>
      <svg className="icon">
        <use href={`${Sprite}#3`} />
      </svg>
      <svg className="icon">
        <use href={`${Sprite}#4`} />
      </svg>
      <svg className="icon">
        <use href={`${Sprite}#5`} />
      </svg>
      <svg className="icon">
        <use href={`${Sprite}#6`} />
      </svg>
      <svg className="icon">
        <use href={`${Sprite}#7`} />
      </svg>
     
    </div>

          <div >
            <h3 >
              Background
            </h3>
            <div className="image-container">
  {backgroundImages.map((image) => (
    <div
      key={image.id}
      className="image-item"
      style={{
        backgroundImage: `url(${image.jpgVersion || image.min})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '24px',
        height: '24px',
        cursor: 'pointer',
        marginBottom: '4px',
      }}
    ></div>
  ))}
</div>

          </div>
          <div className='div-btn'>
          <Button className="custom-create-btn">
            <span>
              Create
            </span>
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
