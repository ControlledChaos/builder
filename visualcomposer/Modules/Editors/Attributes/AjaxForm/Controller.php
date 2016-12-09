<?php

namespace VisualComposer\Modules\Editors\Attributes\AjaxForm;

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Request;
use VisualComposer\Helpers\Traits\EventsFilters;

class Controller extends Container implements Module
{
    use EventsFilters;

    public function __construct()
    {
        /** @see \VisualComposer\Modules\Editors\Attributes\AjaxForm\Controller::render */
        $this->addFilter(
            'vcv:ajax:attribute:ajaxForm:render:adminNonce',
            'render'
        );
    }

    /**
     * @param Request $request
     *
     * @return array
     */
    private function render(Request $request, $response)
    {
        $action = $request->input('vcv-form-action');
        $data = $request->input('vcv-form-data');
        $value = $request->input('vcv-form-value');
        // Output Result Form JSON.
        $response['html'] = '';
        $response['status'] = true;

        // Do Filter with action/data.
        $response = vcfilter(
            'vcv:ajaxForm:render:response',
            $response,
            [
                'action' => $action,
                'data' => $data,
                'value' => $value,
            ]
        );

        return $response;
    }
}
