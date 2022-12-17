this is a rest api made with node js and express js and mongodb atlas

in this is api i deal with the the sample_mflix database that contains data on movies and movie theaters. The database also contains collections for certain metadata, including users and comments on specific movies.

link to the database: https://docs.atlas.mongodb.com/sample-data/sample-mflix/

api routes:

1. /movies

---

----------------movies routes-----------------------

---

movies schema :
{
plot (string): A brief summary of the movie plot.
genres (array of strings): A list of genres the movie belongs to.
runtime (number): The runtime of the movie in minutes.
cast (array of strings): A list of the movie's cast members.
num_mflix_comments (number): The number of comments on the movie in the MFlix system.
title (string): The title of the movie.
fullplot (string): A more detailed plot summary of the movie.
countries (array of strings): A list of countries where the movie was produced.
released (date): The date the movie was released.
directors (array of strings): A list of the movie's directors.
rated (string): The movie's rating (e.g. "PG-13", "R", "UNRATED").
awards (object): An object containing information about the movie's awards. - wins (number): The number of awards won by the movie. - nominations (number): The number of award nominations the movie received. - text (string): A string summarizing the movie's awards.
lastupdated (date): The date the movie's information was last updated.
year (number): The year the movie was released.
imdb (object): An object containing information about the movie from the IMDb database. - rating (number): The movie's IMDb rating (out of 10). - votes (number): The number of votes the movie has received on IMDb. - id (number): The movie's IMDb ID.
type (string): The type of media (e.g. "movie", "tv series").
tomatoes (object): An object containing information about the movie from the Rotten Tomatoes database. - viewer (object): An object containing information about viewer ratings for the movie. - rating (number): The movie's Rotten Tomatoes viewer rating (out of 5). - numReviews (number): The number of viewer reviews the movie has received on Rotten Tomatoes. - meter (number): The movie's Rotten Tomatoes meter score (out of 100). - lastUpdated (date): The date the movie's information was last updated on Rotten Tomatoes.
}

#get sample (random) movies
localhost:8080/api/v1/movies?option=random&size=20
*option: random
*size: number of movies to return ( should be less than 20 and greater than 0)

#get movie by id
localhost:8080/api/v1/movies/573a1390f29313caabcd50e5

#get movies by genere
localhost:8080/api/v1/movies?option=genre&size=200&genre=Crime
*option: genre (case sensitive) (enum "Comedy", "Fantasy","Crime","Drama","Music","Adventure","History","Thriller","Animation","Family","Biography","Action","Film-Noir","Romance","Sci-Fi","War","Western","Horror","Musical", "Sport") ( may not exist in the database)
*size: number of movies to return ( should be less than 20 and greater than 0)

#post movie
localhost:8080/api/v1/movies
body:(example)

      {

"plot": "Three men hammer on an anvil and pass a bottle of beer around.",
"genres": [
"Short"
],
"runtime": 1,
"cast": [
"Charles Kayser",
"John Ott"
],
"num_mflix_comments": 0,
"title": "Blacksmith Scene",
"fullplot": "A stationary camera looks at a large anvil with a blacksmith behind it and one on either side. The smith in the middle draws a heated metal rod from the fire, places it on the anvil, and all three begin a rhythmic hammering. After several blows, the metal goes back in the fire. One smith pulls out a bottle of beer, and they each take a swig. Then, out comes the glowing metal and the hammering resumes.",
"countries": [
"USA"
],
"released": {
"$date": {
      "$numberLong": "-2418768000000"
}
},
"directors": [
"William K.L. Dickson"
],
"rated": "UNRATED",
"awards": {
"wins": 1,
"nominations": 0,
"text": "1 win."
},
"lastupdated": "2015-08-26 00:03:50.133000000",
"year": 1893,
"imdb": {
"rating": 6.2,
"votes": 1189,
"id": 5
},
"type": "movie",
"tomatoes": {
"viewer": {
"rating": 3,
"numReviews": 184,
"meter": 32
},
"lastUpdated": {
"$date": {
        "$numberLong": "1435516449000"
}
}
}
}
#put movie (update with replacing the movie in the database)
localhost:8080/api/v1/movies/573a1390f29313caabcd50e5
body:(example): the exemple is the same as the post movie( provide the whole movie)

#patch movie by id (update without replacing the movie in the database)
localhost:8080/api/v1/movies/573a1390f29313caabcd50e5
body:(example)
{
"plot": "Sophie Louise Hart"
}

---

---------------movies routes end--------------------

---

2. /theaters
   #get a theater by id
   localhost:8080/api/v1/theaters/59a47286cfa9a3a73e51e72d

   #get randome theaters
   localhost:8080/api/v1/theaters?option=random&size=10

   #put(replace ) a theater by id
   localhost:8080/api/v1/theaters/59a47286cfa9a3a73e51e72c
   body :
   {
   "theaterId": 1003,
   "location": {
   "address": {
   "street1": "340 W Market",
   "city": "Bloomington",
   "state": "MN",
   "zipcode": "55425"
   },
   "geo": {
   "type": "Point",
   "coordinates": [
   -93.24565,
   44.85466
   ]
   }
   }
   }

   #delete a theart by id
   localhost:8080/api/v1/theaters/59a47286cfa9a3a73e51e72c

   #post(create a theart)
   localhost:8080/api/v1/theaters/
   body:
   {
   "theaterId": 1003,
   "location": {
   "address": {
   "street1": "340 W Market",
   "city": "Bloomington",
   "state": "MN",
   "zipcode": "55425"
   },
   "geo": {
   "type": "Point",
   "coordinates": [
   -93.24565,
   44.85466
   ]
   }
   }
   }
   #update

---

----------------movies routes-----------------------

---

----------------comments routes------------------------
get comments by movie id
localhost:8080/api/v1/movies/573a13bff29313caabd5e91e/comments?s=1&e=120
s: start index of the comments
e: end index of the comments
rules:

1. s should be less than e
2. s and e should be greater than 0
3. e-s should be less than 20

... working on it ...

# how to run the api

1. clone the repo
2. cd into the repo
3. run npm install
4. create a .env file and add the following<br/>
   DB_USERNAME=your_username<br/>
   DB_PASSWORD=your_password><br/>
   DB_CLUSTER=your_cluster name><br/>
5. run npm start
6. open postman and test the api
7. enjoy
