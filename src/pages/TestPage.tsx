import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';



const getData = async({ count }: any) => {
    let uri = `https://api.github.com/search/repositories?sort=stars&q=javascript&per_page=10&page=${count}`;
    let data: any = await axios.get(uri);
    
    return data.data.items;
}

const RepoBox = ({ id, owner, name, description, avatarURL, checkBox }: any) => {
    
    
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

const CheckBox = ({ handleChange, id }: any) => {
    let checked = true;
    if(localStorage.getItem(id.toString())) {
        checked = false;
    }
    return (
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" value={ id }  onChange={ handleChange } checked={ checked } />
            
        </div>
    )
        
}




const TestPage = () => {
    const[data, setData] = useState<any>([]);
    const[loading, setLoading] =useState<boolean>(true);
    const[checked, setChecked] = useState<boolean>(true);
    const[count, setCount] = useState<number>(1);
    
    
    

    useEffect(() => {
        const getRepos = async() => {
            let response = await getData({ count });
            setData(response);
            setLoading(false);
            
        }
        getRepos();
    }, [count]);
    
    const handleChange = (e: any) => {
        setChecked(!checked);
        
        
        if(localStorage.getItem(e.target.value)) {
            localStorage.removeItem(e.target.value)
            
        }
        else {
            let status = {
                id: e.target.value,
                checked: false
            }
            localStorage.setItem(e.target.value, JSON.stringify(status));
  
        }
               
    }

    const handleClickNext = () => {
        setCount(count + 1);
    }
    const handleClickPrev = () => {
        if(count - 1 > 0) {
            setCount(count - 1);
        }
        else {
            setCount(1);
        }
    }
    
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
export default TestPage;