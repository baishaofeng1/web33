<template>
  <div>
      <ProductHead />
      <ProductList />
      <ProductPagination />
      <ProductAdd />
  </div>
</template>

<script>
import ProductHead from "./productHead.vue"
import ProductList from "./productList.vue"
import ProductPagination from "./productPagination.vue"
import ProductAdd from "./productAdd.vue"

export default {
  components:{
    ProductHead,
    ProductList,
    ProductPagination,
    ProductAdd
  }
}
</script>

<style>

</style>