<template>
     <!-- Button -->
    <div class="row-mb-3">
       <div class="col text-end">
        <button type="button" class="btn btn-primary" @click="modal.show()">
            Add Book
        </button>
       </div>
    </div>

    <!-- Table -->
     <div class="row">
        <div class="col">
            <table class="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Page</th>
                        <th class="text-center">Edit</th>
                        <th class="text-center">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Gülün Adı</td>
                        <td>Umberto Eco</td>
                        <td style="max-width:250px">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium.
                        </td>
                        <td>
                            217
                        </td>
                        <td class="text-center">
                            <font-awesome-icon :icon="['far','pen-to-square']" class="text-warning" style="cursor:pointer" />
                        </td>
                        <td class="text-center">
                            <font-awesome-icon :icon="['fas', 'trash']" class="text-danger" style="cursor:pointer" @click="deleteBook(book._id)"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
     </div>

     <!-- Modal -->
      <!-- ref="component ile dom elementi arasındaki bağlantıyı kurmamızı sağlayan vue ya ait spesifik attribute" -->
      <div class="modal fade" ref="addEditModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addModalLabel">Add Book</h5>
                    <button type="button" class="btn-close" aria-label="Close" @click="modal.hide()"></button>
                </div>
                <div class="modal-body mx-5">
                    <div class="col mb-3">
                        <label for="title" class="form-label">Title
                        <span class="text-danger">*</span>
                        </label>
                        <input type="text" class="form-control" id="title" name="title" required />
                    </div>
                    <div class="col mb-3">
                        <label for="author" class="form-label">Author
                            <span class="text-danger">*</span>
                        </label>
                        <input type="text" class="form-control" id="author" name="author" required>
                    </div>
                    <div class="col mb-3">
                        <label for="description" class="form-label">Description
                            <span class="text-danger">*</span>
                        </label>
                        <textarea name="description" id="description" class="form-control" cols="30" rows="10"></textarea>
                    </div>
                    <div class="col mb-3">
                        <label for="author" class="form-label">Number Of Pages
                            <span class="text-danger">*</span>
                        </label>
                        <input type="text" class="form-control" id="numOfPages" name="numOfPages" required>
                    </div>
                    <div class="text-end mb-4">
                        <button type="button" class="btn btn-outline-secondary" @click="modal.hide()">Close</button>
                        <button type="button" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
</template>

<script>
import { Modal } from 'bootstrap';
    export default {
        name : 'DashboardBooks',
        data() {
            return {
               modal : null,
            }
        },
        /*
        * Vue.js lifecycle hook
        - Vue.js componentlerinin yaşam döngüsü içerisinde yer alan bir hook
        - Vue.js componentlerinin oluşturulması, güncellenmesi ve yok edilmesi gibi durumlarla ilgili işlemleri yapmamızı sağlar
        - Mounted hook'u, componentin DOM'a yerleştirildiği anda tetiklenir
        - Bu hook içerisinde, componentin DOM'a yerleştirilmesi sonrasında yapılması gereken işlemleri gerçekleştirebiliriz.
        - Örneğin; componentin içerisinde yer alan bir elemente erişmek istediğimizde, bu elementin DOM'a yerleştirilmesi sonrasında bu işlemi gerçekleştirebiliriz
        -Created hook'u ile benzerdir, fakat Created hook'u, componentin data ve methodlarının oluşturulduğu anda tetiklenirken, Mounted hook'u, componentin DOM'a yerleştirildiği anda tetiklenir
        - Bu hook içerisinde, componentin data ve methodlarına erişebiliriz
        - Created ve mounted hook ları arasındaki en önemli fark created sayfa olultuğu anda, mounted ise dom a yerleştirildiği anda çalışır
         */
        mounted() {
            this.modal = new Modal(this.$refs.addEditModal);
        },

    }
</script>

<style scoped>

</style>