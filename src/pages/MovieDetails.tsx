import { useEffect, useState, useContext, Context} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Movie } from "./Home";
import { FavoritesContext } from "../context/FavoritesContext";
import { AuthContext } from "../context/AuthContext";
import ReviewForm from "../components/ReviewForm";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { lazy, Suspense, ReactNode } from "react";
import { ContextProps } from "../context/FavoritesContext";

interface Review {
    movieId: number;
    review: string;
    userName: string;
    userId: number;
}

const LazyImage = lazy(() => import('../components/LazyImage'));

const TMDB_API_KEY = '521b418e6b0c0227a624515e80c9288a';
const TMDB_API_URL = `https://api.themoviedb.org/3/movie`;

export default function MovieDetails(){
    const {id} = useParams();
    const [movie, setMovie] = useState<Movie>();
    const { setFavorite, favorites } = useContext<ContextProps>(FavoritesContext as Context<ContextProps>);
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const reviewsRef = collection(db, "reviews");
        const q = query(reviewsRef, where("movieId", "==", parseInt(id?id:'-1')));
        getDocs(q).then((snapshot) => {
            setReviews(snapshot.docs.map((doc) => doc.data() as Review));
        });
        axios.get(`${TMDB_API_URL}/${id}?api_key=${TMDB_API_KEY}`).then(
            (res) => setMovie(res.data)
        );
    }, [id,reviews]);

    if(!movie) return <p>Loading...</p>;

    let favButtonLabel = '';

    if(!favorites.has(movie.id)){
        favButtonLabel = 'Add to Favorites';
    } else {
        favButtonLabel = 'Remove from Favorites';
    }

    let reviewForm;
    if(user){
        reviewForm = <ReviewForm movieId={movie.id} />;
    }

    let reviewDisplay;
    if(reviews){
        reviewDisplay = 
        <div className="p-4">
            <h1>Reviews</h1>
            {reviews.map((r: Review, index) => (
                <p className="text-right" key={index}><strong>{r.review}</strong><br />by: {r.userName}</p>
            ))}
        </div>
    }

    return(
        <Suspense fallback={(<div className="spinner"></div> as ReactNode)}>
            <div className="p-4">
                <LazyImage
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    clasName="w-64 rounded"
                    alt={movie.title}
                />
                <h1 className="text-2x1 font-bold">{movie.title}</h1>
                <p>{movie.overview}</p>
                <p>⭐ {movie.vote_average}</p>
                <button onClick={() => setFavorite(movie)} className="bg-blue-500 text-white px-4 py-2 rounded">{favButtonLabel}</button>
                {reviewForm}
                <br />
                {reviewDisplay}
                <br />
            </div>
        </Suspense>
    );
}