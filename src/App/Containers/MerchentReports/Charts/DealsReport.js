import React, {useEffect, useState} from "react";
import { compose } from "redux";
import BaseHOC from "../../BaseHOC";
import {Card} from "../../../Components/atoms/Card";
import {Typography} from "../../../Components/atoms/Typography";
import BarChart  from '../../../Components/atoms/Charts/Bar';
import ReportStore from "../../../Containers/MerchentReports/ReportStore";
import {get} from "lodash";
import Select from "../../../Components/atoms/MultiSelect/Select";
import {Button} from "../../../Components/atoms/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {roles, timeDurations} from "../../../Utils/constants";

function DealsReport(props) {
    const {userId, t } = props;
    const countArray =[];
    const nameArray =[];
    console.log(countArray)

   const addDealCount =(item, i)=>{
            console.log(item)
            countArray[i]=item.viewCount;
            console.log(countArray)
   }

    const addDealName =(item, i)=>{
        nameArray[i]=item.deal.title;
        console.log(nameArray)

    }

    const schema = yup.object().shape({
        option: yup.string().required().nullable()
            .transform(value => (value ? value.value : null))
            .label(("option"))
    });

    const { register, handleSubmit,formState:{ errors }, setValue, control, watch } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const onSubmit = data => {
        props.getAudienceReachDealForTopTen({
            ...data,
            userId,            
           // merchantId: props.userRole === roles.admin ? "ALL" : userId
            //when this is uncommented, api call will sucess, but then clean the graph
        })
    }


    const [optionTypes] = useState([
        {value: timeDurations.today, label: t("reports.today")},
        {value: timeDurations.yesterday, label: t("reports.yesterday")},
        {value: timeDurations.thisWeek, label: t("reports.thisWeek")},
        {value: timeDurations.thisMonth, label: t("reports.thisMonth")},
        {value: timeDurations.thisYear, label: t("reports.thisYear")},
    ])

 
    const renderMainHeader = () =>{
        return(
            <Card type="primary" size="full" className="  mb-2 mt-3"  >
                <div className="flex justify-between" >
                    <div className=" justify-start">
                        <div className="">
                            <Typography color="primary" type="h1">Audience Reach Report-Deal</Typography>
                        </div >
                    </div>
                </div>
            </Card>
        );
    }

    const renderFilter = ()=>{

        return (
            <Card type="primary" size="full" className=" bg-white">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex  content-start">
                        <div className=" className= flex flex-col mt-5 mr-5 w-3/12">
                            <Select
                                name={"option"}
                                label={t("Option")}
                                error={errors.option?.message}
                                isMulti={false}
                                options={optionTypes}
                                defaultValue={{value: timeDurations.thisWeek, label: t("reports.thisMonth")}}
                                controlObject={control}
                                required={true}
                            />
                        </div>
                        <div className=" content-start md:w-1/3  relative">
                
                            <div className="absolute inset-y-0 mt-2 right-0 mr-2 text-gray-500">
                            <Button
                                    type="purpeldark"
                                    className="mb-2  "
                            >
                                Generate
                                </Button>
                            </div>
                        </div>         
                    </div>
                </form>
            </Card>
          );
    }

    useEffect(()=>{
        return () => props.resetDealsState();
    },[])


    const data =  {

        datasets: [{
        data: countArray,
        backgroundColor: '#2bdbd3'
        }],
        labels: nameArray,      
        options: {
            title: {
              display: true,
              text: 'Deal Title vs View Count'
            },
            legend: { display: false }
          },

          scales: {
            yAxes: [{
            scaleLabel: {
                    display: true,
                    labelString: 'HR (Bpm)'
                        },
                ticks: {
                    beginAtZero:true
                }
            }],
            xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time (Mins)'
                        }
                    }],
        }
    }

    const renderChart = ()=>{       
        return(
            <div>
                <Card  type="primary" size="full" className="  mb-2"  >                  
                    <BarChart                    
                        data= {data}
                        width={ 200 }
                        height={ 100 } 
                        options={ data.options}
                  //     scales ={ data.scales.yAxes.scaleLabel.labelString}
                                             
                    />                    
                                                      
                </Card>
            </div>
        )
    } 

    return (
        <div>    
        {renderFilter()} 
        { props.dealReportsDataMV?.views?.length>0
            ? props.dealReportsDataMV?.views.map((item, i) => addDealCount(item,i))
          : "no data"
        }
        { props.dealReportsDataMV?.views?.length>0
            ? props.dealReportsDataMV?.views.map((item, i) => addDealName(item,i))
          : "no data"
        }          
        { renderChart() }         
        </div>            
    )
}
export default compose(BaseHOC)(ReportStore(DealsReport))