import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { recommendedProfile } from '../api'
import {Profile, SkeletonProfile} from '../components/profile'

export default function TestPage() {

    useEffect(() => {
        recommendedProfile()
    }, [])

    return <div> hello </div>
}