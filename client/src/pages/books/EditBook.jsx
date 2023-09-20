import React, { useEffect, useState } from 'react'
import LabelInput from './LabelInput'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const EditBook = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [bookId, setBookId] = useState('')
    const [slug, setSlug] = useState('')
    const [stars, setStars] = useState('')
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState("")
    const [thumbnail, setThumbnail] = useState(null)
        
        const local = "http://localhost:8000"
        const base_url = "https://book-mern-api.onrender.com"
        const paramSlug = useParams();
        const url = `${base_url}/api/book/${paramSlug.slug}`;

        const fetchData = async() => {
                
            const response = await axios.get(url);

            if(response.status !== 200){
                throw new Error("Failed to fetch.");
            }

            const data = response.data;
            console.log(data);
            setBookId(data._id);
            setTitle(data.title);
            setSlug(data.slug);
            setStars(data.stars);
            setDescription(data.description);
            setCategories(data.categories);
            setThumbnail(data.thumbnail);

        }
        
        const handleCategoryChange = (e) => {
            setCategories(e.target.value.split(",").map((category) => category.trim()));
        }
        
        const onImageChange = (e) => {
            if(e.target.files && e.target.files[0]){
                setImage(URL.createObjectURL(e.target.files[0]));
                setThumbnail(e.target.files[0]);
            }
        }

        const handleSubmit = async(e) => {
            e.preventDefault();
                
                const formData = new FormData(); 
                formData.append("bookId", bookId);
                formData.append("title", title);
                formData.append("slug", slug);
                formData.append("stars", stars);
                formData.append("description", description);
                formData.append("category", categories);
                
                if(thumbnail){
                    formData.append("thumbnail", thumbnail);
                }
        
                // title, slug, stars, description, thumbnail
                try {
                
                    const response = await axios.put(`${base_url}/api/book`, formData);

                    if(response.status === 200){
                    setSlug("")
                    setTitle("") 
                    console.log("Added Book!");
                    navigate('/books')
                }else{
                    console.log("Failed to add.")
                }
            } catch (error) {
                console.log(error)
            }
        }


        //REMOVE BOOK FUNCTION
        const removeBook = async(e) => {
            e.preventDefault();

            try {
                //we alr have bookId in the start 
                const response = await axios.delete(`${base_url}/api/book/${bookId}`);

                if(response.status === 200){
                    console.log("Book removed!");
                    navigate("/books")
                }else{
                    console.log("Cannot remove!")
                }
            } catch (error) {
                console.log(error)
            }
        }
        

        useEffect(() => {
            fetchData();
        },[])
        
        const textAreaPlaceHolder = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo quam, nostrum, ducimus repellendus laborum eveniet minima quae suscipit "

    return (
        <section className='pt-4 h-auto'>
                <form action="" className='flex flex-col sm:flex-row items-start justify-between gap-5' onSubmit={handleSubmit}>
            <div className='w-full sm:w-3/4 rounded-xl flex flex-col items-center justify-center'>
                <h1 className='mr-20 mb-3 font-semibold text-xl'>Edit Book</h1>
                {image 
                ? 
                <img src={image} alt='noIMG' className='h-[360px] w-[280px] object-cover rounded-xl max-sm:ml-[50%] max-sm:-translate-x-[50%] sm:mr-60'/>
                :
                <img src={`${base_url}/uploads/${thumbnail}`} alt='noIMG' className='h-[360px] w-[280px] object-cover rounded-xl max-sm:ml-[50%] max-sm:-translate-x-[50%] sm:mr-60'/>
                }
                <input onChange={onImageChange} type="file" accept='image/gif, image/jpeg, image/png' className='mt-5 max-sm:ml-[5rem]'/>
            </div>
            <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
                    <LabelInput Label="Title" InputType="text" InputnName="title" InputPlaceholder="Gate way" InputValue={title} InputOnChange={(e) => setTitle(e.target.value)}/>
                    <LabelInput Label="Slug" InputType="text" InputnName="slug" InputPlaceholder="gate-way" InputValue={slug} InputOnChange={(e) => setSlug(e.target.value)}/>
                    <LabelInput Label="Stars" InputType="text" InputnName="stars" InputPlaceholder="4"  InputValue={stars} InputOnChange={(e) => setStars(e.target.value)}/>
                    <LabelInput Label="Description" TextAreaName="description" TextAreaValue={description} TextAreaPlaceholder={textAreaPlaceHolder} TextArea={true} TextAreaOnChange={(e) => setDescription(e.target.value)}/>
                    <LabelInput Label="Category" InputType="text" InputValue={categories} InputnName="category" InputPlaceholder="sceince, romance" InputOnChange={handleCategoryChange}/>
                    <button type='submit' className='bg-gray-400 bg-opacity-40 px-4 py-2 rounded-lg hover:bg-opacity-100 font-semibold'>Update book</button>
                    <button className='bg-red-500 bg-opacity-70 px-4 py-2 rounded-xl font-semibold' onClick={removeBook}>Delete Book</button>
            </div>
                </form>
        </section>
    )
}

export default EditBook
