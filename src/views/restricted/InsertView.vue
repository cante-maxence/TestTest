<script setup lang="ts">

import { supabase } from '../../lib/supabaseClient';

const insertOrder = async () => {
    try {
        const { data, error } = await supabase
            .from('countries')
            .insert(
                { id: 6, name: 'test_2' }
            )
        if (data) {
            console.log(data)
        }
    } catch (error) {
        console.log(error)
    }
}

const updateOrder = async () => {
    try {
        const { data, error } = await supabase
            .from('countries')
            .update({ name: 'Espagne' })
            .eq('id', '5')
        if (data) {
            console.log(data)
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteOrder = async () => {
    try {
        const { data, error } = await supabase
            .from('countries')
            .update({ name: 'Espagne' })
            .eq('id', '5')
        if (data) {
            console.log(data)
        }
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <div>
        <button class="border" @click="insertOrder">
            Insert here
        </button>

        <button class="border" @click="updateOrder">
            Update here
        </button>

        <button class="border" @click="deleteOrder">
            Delete here
        </button>
    </div>
</template>