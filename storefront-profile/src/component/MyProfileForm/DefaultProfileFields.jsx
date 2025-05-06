import { FirstName } from "../FirstName/FirstName";
import { LastName } from "../LastName/LastName";
import { Email } from "../Email/Email";
import { Contact } from "../Contact/Contact";
import { BirthDate } from "../BirthDate/BirthDate";
import React from "react";
import { Gender } from "../Gender/Gender";
import { useSelector } from 'react-redux';
import { DefaultProfileFieldsDuo } from "./DefaultProfileFieldsDuo";
import { Referby } from '../ReferBy/Referby';

export const DefaultProfileFields = () => {
    const microFrontEndData = useSelector(state => state.storeFrontContainer.microFrontEndData)

  if(microFrontEndData?.accountSettings?.template === 2) {
    return <DefaultProfileFieldsDuo />
  }
    return (
        <>
            <FirstName />
            <LastName />
            <Email />
            <Contact />
            <BirthDate />
            <Gender />
            <Referby />
        </>
    )
  }