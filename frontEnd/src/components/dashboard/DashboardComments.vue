<template>
   <div class="row">
    <div class="col">
        <table class="table">
            <thead>
                <tr>
                    <th>Content</th>
                    <th>Books</th>
                    <th class="text-center">Edit</th>
                    <th class="text-center">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="comment in commentsByUser" :key="comment._id">
                    <td>{{ comment.content }}</td>
                    <td>{{ comment.book.title }}</td>
                    <td class="text-center">
                        <font-awesome-icon :icon="['far','pen-to-square']" class="text-warning" style="cursor: pointer;" @click="openEditModal(comment)"/>
                    </td>
                    <td class="text-center">
                        <font-awesome-icon :icon="['fas','trash']" class="text-danger" style="cursor: pointer;" @click="openDeleteModal(comment)" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
   </div>

   <!-- editModal -->
   <div ref="editModal" class="modal fade" tabIndex="-1" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editModalLabel">Edit Comment</h5>
                    <button tyğe="button" class="btn-close" aria-label="Close" @click="editModal.hide()"></button>
                </div>
                <div class="modal-body mx-5">
                    <div class="col mb-3">
                        <label for="comment" class="form-label">Comment
                            <span class="text-danger">*</span>
                        </label>
                        <input v-model="commentData.content"  type="text" class="form-control" id="comment" name="comment" required>
                    </div>
                    <div class="text-end mb-4 d-flex justify-content-end">
                        <button type="button" class="btn btn-outline-secondary" @click="editModal.hide()">Close</button>
                        <button type="button" class="btn btn-primary" @click="editedComment()">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- delete Modal -->
    <div ref="deleteModal" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteModalLable">Delete Comment</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="deleteModal.hide()"></button>
            </div>
            <div class="modal-body">
                <p>Are you sure the delete this comment ? </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="deleteModal.hide()">Close</button>
                <button type="button" class="btn btn-primary" @click="deletedComment()">Delete</button>
            </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { useCommentStore } from '@/stores/commentStore.js';
    import { useAuthStore } from '@/stores/authStore.js';
    import { mapState, mapActions } from 'pinia';
    import DashboardEditComment  from '@/components/dashboard/modals/DashboardEditComment.vue' 
    import { Modal } from 'bootstrap';
    import { useToast } from 'vue-toastification';
 
    export default {
        name: 'DashboardComments',
        components : {
            DashboardEditComment
        },
        data() {
            return {
                editModal : null,
                deleteModal : null,
                modalTitle : '',
                editCommentId : null,
                deleteCommentId : null,
                commentData : {
                    content : '',
                
                }
            }
        },

        mounted() {
            this.editModal = new Modal(this.$refs.editModal);
            this.deleteModal = new Modal(this.$refs.deleteModal);

        },
       
        computed : {
            ...mapState(useCommentStore, ['commentsByUser']),
            ...mapState(useAuthStore, ['user'])

        },
     
        created() {
            this.fetchCommentsByUser(this.user._id);
        },
        methods : {
            ...mapActions(useCommentStore, ['fetchCommentsByUser', 'editComment', 'deleteComment']),
            showToast(message, options) {
                const toast = useToast();
                toast(message,{
                    position : 'top-right',
                    closeButton : 'button',
                    icon : true,
                    rtl : false,
                    ...options
                });
              
            },
            openEditModal(comment) {
                
                this.editCommentId = comment._id;
                this.commentData.content = comment.content;
                // this.commentData.book.title = comment.book.title;
                // this.commentData.book.description = comment.book.description;
                // this.commentData.book.author = comment.book.author;
                // this.commentData.book.pageNumber = comment.book.pageNumber;
                this.editModal.show();
                
         
            },

            openDeleteModal(comment) {
                
                this.deleteCommentId = comment._id;
                this.deleteModal.show();

            },

            async editedComment() {
                try {
                    await this.editComment(this.editCommentId, this.commentData);

                    await this.fetchCommentsByUser(this.user._id);

                     this.editModal.hide();

                     this.showToast('Comment updated successfully', {type : 'success', timeout : 3000});

                } catch (error) {
                    console.error(error);
                }
            },

            async deletedComment() {
                try {
                    await this.deleteComment(this.deleteCommentId);

                    await this.fetchCommentsByUser(this.user._id);

                    this.deleteModal.hide();

                    this.showToast('Comment deleted successfully', {type : 'success', timeout : 3000});

                } catch (error) {
                    console.error(error);
                }
            }
        }

    }
</script>

<style scoped>

</style>