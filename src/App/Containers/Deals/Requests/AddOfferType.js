import React, {useEffect} from "react"
import {compose} from "redux";
import BaseHOC from "../../BaseHOC";
import DealsStore from "../DealsStore";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {Card} from "../../../Components/atoms/Card";
import {Typography} from "../../../Components/atoms/Typography";
import {Button} from "../../../Components/atoms/Button";
import {Textfield} from "../../../Components/atoms/Textfield";
import {useLocation, useParams} from "react-router-dom";

const AddOfferType = (props) => {
    const { t, userId } = props;
    const { id } = useParams();
    const { state } = useLocation();

    const schema = yup.object().shape({
        name: yup.string().required().label(t("common.name"))
    })

    const { register, handleSubmit,formState:{ errors },reset } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const onSubmit = data => {
        props.createOfferType({
            ...data,
            userId
        })
    }

    useEffect(()=>{
        if (id){
            reset({
                name: state?.name,
            })
        }
    },[])

    return (
        <>{
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Card type="primary" size="full" className=" bg-white mb-2">
                        <div className="flex justify-between">
                            <div className="flex justify-start">
                                <Typography color="secondary" type="h3">{t("navigation.addOfferType")}</Typography>
                            </div>
                        </div>
                    </Card>
                    <div className="w-full flex-row">
                        <div className="flex flex-col   bg-gradient md:bg-white md:bg-none">
                            <div className=" ">
                                <Card type="primary" className="w-1/2  ">
                                    <div className="mt-5 ">
                                        <Textfield
                                            type={ errors.name?"red": "primary"}
                                            size="sm"
                                            placeholder={t("common.name")}
                                            inputParams={register("name")}
                                            error={errors.name?.message}
                                            label={t("common.name")}
                                            required={true}
                                        />
                                    </div>
                                </Card>
                                <Card type="primary" className="w-1/2  ">
                                    <div className="flex flex-row justify-end">
                                        <Button
                                            type="purpeldark"
                                            className="mb-2  "
                                        >
                                            {t('common.submit')}
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        }
        </>
    )
}

export default compose(BaseHOC)(DealsStore(AddOfferType))