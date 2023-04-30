import { Grid } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import StaticItem from './StaticItem'
import { convertStatisticsNameToUri } from '../../../helpers'

export default function Statics({ stats }) {
    return (
        <Grid container spacing={3}>
            {
                stats.map((state, index) => (
                    <Link href={"/admin/"+ convertStatisticsNameToUri(state.name)} key={index}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <StaticItem staticLength={state.count} staticName={state.name} index={index} />
                        </Grid>
                    </Link>
                ))
            }
        </Grid>
    )
}
