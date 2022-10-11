import React, {useEffect,useState} from 'react'
import PhotoList from '../components/PhotoList';
import { Link } from 'react-router-dom'
import CommentListPage from './CommentListPage';
function Image() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <AlbumDetail albums={albums} />
    </div>
  );

}

function AlbumDetail({ albums }) {

  const [clicked, setClicked] = useState(false);
  const [photos, setPhotos] = useState([]);
  
  
  const fetchPhotos = (albumId,title) => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
      })
      .catch((error) => {
        console.log(error);
      }); 
          return albumId                
  };
   
  const albumsList = albums.slice(0,10).map((album, index) => (
    <div key = {index}>
      <h4>{album.title}</h4>
      <p
        className="link"
        onClick={() => {
          setClicked(true,album.title);
          fetchPhotos(album.id,album.title);
        }}
      >Get photos
      </p>
    </div>
  )
  
  );
  
  const postPhotos = (
    <div>
      {photos.slice(0,50).map((photo, index) => (
        <figure>
          <figcaption>Photo {index + 1}</figcaption>
          <img src={photo.thumbnailUrl} alt='' />
        </figure>
      ))}
   </div> 
  );
  
  return (
    <div className="">
      <div className = "albums" style={{overflowY:"scroll",height: "200px",backgroundColor:"#33B5FF"}}>{albumsList}</div><br/>
      <div style={{height:"60px"}}><h2> {clicked ? "Album Name" : "Get Photos from Album"} </h2></div>
      <div className="photos" style={{overflowY:"scroll",height: "300px",backgroundColor:"#B0BDC4 "}}>
        { postPhotos && <PhotoList data={postPhotos} /> }
      </div>
      
    </div>
  );
}

export default Image