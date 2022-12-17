this is a rest api made with node js and express js and mongodb atlas

in this is api i deal with the the sample_mflix database that contains data on movies and movie theaters. The database also contains collections for certain metadata, including users and comments on specific movies.

link to the database: https://docs.atlas.mongodb.com/sample-data/sample-mflix/

api routes:

1. /movies

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

... working on it ...

# how to run the api

1. clone the repo
2. cd into the repo
3. run npm install
4. create a .env file and add the following
   DB_USERNAME=<your username>
   DB_PASSWORD=<your password>
   DB_CLUSTER=<your cluster name>
5. run npm start
6. open postman and test the api
7. enjoy
