import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';


//Gets data from the API. Count parameter is used to determine the page number
const getData = async({ count }: any) => {
    let uri = `https://api.github.com/search/repositories?sort=stars&q=javascript&per_page=10&page=${count}`;
    let data: any = await axios.get(uri);
    //return relevant info needed for displaying
    return data.data.items;
}

//The container infobox which holds displayed information
const RepoBox = ({ id, owner, name, description, avatarURL, checkBox }: any) => { 
    /*
        checkbox is initialized at top level (HomePage) and passed here for rendering.
        id is used to determine whether the specific checkbox which corresponds to 
        a RepoBox is ticked or not, display accoddingly. This is achieved through use 
        of localStorage to persist upon page refresh.

        The rest of the parameters are info which is to be displayed, mapped from the
        list which was sourced from getData
    */
    return (
        <div>           
            <div className="card text-white bg-dark mb-3"> 

                <div className="card-header">
                    <div className="row">
                        <div className="col-sm">
                            {localStorage.getItem(id.toString()) ? (
                                <h5 className="card-title"></h5>
                            ):
                            (   <div className="row">
                                    <div className="col-sm-2">
                                    <img 
                                        className="avatar"
                                        src={ avatarURL }
                                        alt="new"
                                        
                                    />
                                    </div>
                                    <div className="col-sm">
                                        <h5 className="card-title">{ owner }/{ name }</h5>
                                    </div>
                                </div>
                                
                                
                            ) }
                            
                        </div>
                        <div className="col-sm-1">
                            { checkBox }
                        </div>
                    </div>
                                
                </div>

                <div className="card-body">
                    {localStorage.getItem(id.toString()) ? (
                        <p className="card-text"></p>
                    ):
                    (
                        <p className="card-text">{ description }</p>
                    )}
                    
                    
                </div>

            </div>

        </div>
                   
    )

}

//The checkbox component. localStorage stores state of whether or not it is checked. 
//Each checkbox has the same id as the corresponding RepoBox, passed as parameter from
//RepoBox
const CheckBox = ({ handleChange, id }: any) => {
    let checked = true;
    //if id exists in localStorage it means the box is unchecked.
    if(localStorage.getItem(id.toString())) {
        checked = false;
    }
    return (
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" value={ id }  onChange={ handleChange } checked={ checked } />
            
        </div>
    )
        
}

//top level component
const HomePage = () => {

    const[data, setData] = useState<any>([]); //API data
    const[loading, setLoading] =useState<boolean>(true); //loading?
    const[checked, setChecked] = useState<boolean>(true); //state of checkbox
    const[count, setCount] = useState<number>(1); //page to be fetched
    
    //fetches the data from within a useEffect hook, with the count as the trigger.
    //if count changes, indicating that the user has pressed either Prev or Next,
    //useEffect is invoked anew, and fetches new data as needed
    useEffect(() => {
        const getRepos = async() => {
            let response = await getData({ count });
            setData(response);
            setLoading(false);          
        }
        getRepos();
    }, [count]);
    
    //onChange for the checkBox
    const handleChange = (e: any) => {
        setChecked(!checked);
        //commits id of checkBox to localStorage if unchecked    
        if(localStorage.getItem(e.target.value)) {
            localStorage.removeItem(e.target.value)
            
        }
        //and if checked deletes it
        else {
            let status = {
                id: e.target.value,
                checked: false
            }
            localStorage.setItem(e.target.value, JSON.stringify(status));
  
        }
               
    }
    //onClick for next button
    const handleClickNext = () => {
        setCount(count + 1);
    }
    //onClick for Prev button
    const handleClickPrev = () => {
        if(count - 1 > 0) {
            setCount(count - 1);
        }
        else {
            setCount(1);
        }
    }
    
    //maps fethed data onto RepoBox, and adds pagination buttons 
    return (
        <div>
            {loading ? <p>loading</p> : (
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <Button variant="Secondary" className="button" size="lg" onClick={ handleClickPrev }> <p className="button-text">Prev</p> </Button>
                            <Button variant="Secondary" className="button" size="lg" onClick={ handleClickNext }> <p className="button-text">Next</p> </Button>
                        </div>
                        <div className="col-sm">
                            <div className="page-label">Page { count }</div>
                        </div>
                        
                    </div>
                    { data.map((repo: any) => (
                        
                        <div key={ repo.id }>
                            <div>
                                
                                { RepoBox({ id: repo.id, owner: repo.owner.login, name: repo.name, description: repo.description, avatarURL: repo.owner.avatar_url, checkBox: CheckBox({ handleChange, id: repo.id }) }) }
                                                                  
                            </div>
                        </div>
                    ))}
                    <div className="row">
                        <div className="col-sm">
                            <Button variant="Secondary" className="button" size="lg" onClick={ handleClickPrev }> <p className="button-text">Prev</p> </Button>
                            <Button variant="Secondary" className="button" size="lg" onClick={ handleClickNext }> <p className="button-text">Next</p> </Button>
                        </div>
                        <div className="col-sm">
                            <div className="page-label">Page { count }</div>
                        </div>
                        
                    </div>
                </div>
            )}
                
        </div>
    )
}
export default HomePage;