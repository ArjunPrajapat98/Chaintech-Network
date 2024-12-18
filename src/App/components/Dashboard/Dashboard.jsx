import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { utils } from '../../helper/utils';
import { errorSchema } from '../../helper/errorSchema';
import { InputField } from '../common/InputField';

const formObj = {
    userName: '',
    email_id: '',
    password: '',
}

export default function Dashboard() {

    const [formValue, setFormValue] = useState(formObj);
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);
    const storedUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        setFormValue(storedUser);
    },[])

    const handleOnChange = async (name, value) => {
        const stateObj = { ...formValue, [name]: value };
        setFormValue(stateObj);
        if (!utils.isObjectKeyEmpty(formError)) {
            const validationResult = await utils.checkFormError(stateObj, errorSchema.registerSchema);
            if (validationResult === true) {
                setFormError("");
            } else {
                setFormError(validationResult);
            }
        }
    };

    const handleSubmitClick = async (e) => {
        e.preventDefault();

        const validationResult = await utils?.checkFormError(formValue, errorSchema.registerSchema);

        if (utils?.isObjectKeyEmpty(validationResult)) {
            setLoading(true);
            try {
                localStorage.setItem("user", JSON.stringify(formValue));
                setLoading(false);
                toast.success('Details Update Successfully');
            } catch (error) {
                console.log("errr", error);
            }
            setFormError("");
        } else {
            setFormError(validationResult);
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container">
                <div className="row m-5 no-gutters shadow-lg">
                    <div className="col-md-6 d-none d-md-block img_ajn p-5">
                        <img
                            src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10) + 1}.jpg`}
                            className="img-fluid"
                            style={{ minHeight: "100%" }}
                        />
                    </div>
                    <div className="col-md-6 bg-white p-5">
                        <h3 className="pb-3"> User Details </h3>
                        <div className="form-style mt-5">
                            <form>
                                <div className="form-group pb-3">
                                    <InputField
                                        label="User Name *"
                                        placeholder="User Name"
                                        name='userName'
                                        type='text'
                                        value={formValue?.userName}
                                        focus={!!(typeof formError === "object" && formError?.userName)}
                                        error={!!(typeof formError === "object") ? formError?.userName : ""}
                                        onChange={({ target: { name, value } }) =>
                                            handleOnChange(name, value)
                                        }
                                    />
                                </div>
                                <div className="form-group pb-3">
                                    <InputField
                                        label="Email id *"
                                        placeholder="Email id"
                                        name='email_id'
                                        type='text'
                                        value={formValue?.email_id}
                                        focus={!!(typeof formError === "object" && formError?.email_id)}
                                        error={!!(typeof formError === "object") ? formError?.email_id : ""}
                                        onChange={({ target: { name, value } }) =>
                                            handleOnChange(name, value)
                                        }
                                    />
                                </div>
                                <div className="form-group pb-3">
                                    <InputField
                                        placeholder="Password"
                                        label="Password *"
                                        name='password'
                                        type='Password'
                                        value={formValue?.password}
                                        focus={!!(typeof formError === "object" && formError?.password)}
                                        error={!!(typeof formError === "object") ? formError?.password : ""}
                                        onChange={({ target: { name, value } }) =>
                                            handleOnChange(name, value)
                                        }
                                    />
                                </div>

                                <div className="pb-2 mt-4">
                                    <button
                                        onClick={handleSubmitClick}
                                        type="submit"
                                        className="btn btn-primary w-100 font-weight-bold mt-2"
                                    >
                                        Update & Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}